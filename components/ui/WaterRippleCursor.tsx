"use client";

import { type RefObject, useEffect, useRef } from "react";

type RippleSettings = {
  maxRipples: number;
  fadeDuration: number;
  idleDelay: number;
  hoverCheckInterval: number;
  trackingEase: number;
  viscosity: number;
  speed: number;
  frequency: number;
  blur: number;
  glow: number;
  intensity: number;
  hoverBoost: number;
  trailDistance: number;
  minInterval: number;
  dpr: number;
};

const DESKTOP_RIPPLE_SETTINGS: RippleSettings = {
  maxRipples: 24,
  fadeDuration: 1700,
  idleDelay: 80,
  hoverCheckInterval: 90,
  trackingEase: 15,
  viscosity: 2.05,
  speed: 0.54,
  frequency: 34,
  blur: 2.35,
  glow: 0.34,
  intensity: 0.72,
  hoverBoost: 1.55,
  trailDistance: 24,
  minInterval: 42,
  dpr: 1.25,
};

// Mobile keeps the same shader path but emits fewer, softer ripples for battery and FPS.
const MOBILE_RIPPLE_SETTINGS: RippleSettings = {
  ...DESKTOP_RIPPLE_SETTINGS,
  maxRipples: 14,
  fadeDuration: 1250,
  idleDelay: 120,
  hoverCheckInterval: 150,
  trackingEase: 11,
  viscosity: 2.65,
  glow: 0.24,
  intensity: 0.38,
  hoverBoost: 1.12,
  trailDistance: 54,
  minInterval: 115,
  dpr: 1,
};

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, .magnetic, .glass-panel, .group, [data-ripple-intense]";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  #define MAX_RIPPLES 24

  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_pixelRatio;
  uniform float u_intensity;
  uniform float u_viscosity;
  uniform float u_speed;
  uniform float u_frequency;
  uniform float u_blur;
  uniform float u_glow;
  uniform vec4 u_ripples[MAX_RIPPLES];

  float rippleWave(vec2 uv, vec4 ripple) {
    float age = max(0.0, u_time - ripple.z);
    float life = exp(-age * u_viscosity);
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    float dist = length((uv - ripple.xy) * aspect);
    float front = age * u_speed;
    float ring = sin((dist - front) * u_frequency);
    float envelope = exp(-pow(abs(dist - front) * u_blur, 1.32) * 16.0);
    float spread = exp(-dist * 1.65);

    return ring * envelope * spread * life * ripple.w;
  }

  void main() {
    vec2 uv = v_uv;
    float wave = 0.0;
    float caustic = 0.0;

    for (int i = 0; i < MAX_RIPPLES; i++) {
      float current = rippleWave(uv, u_ripples[i]);
      wave += current;
      caustic += abs(current);
    }

    float softWave = wave * u_intensity;
    vec3 deepInk = vec3(0.025, 0.055, 0.12);
    vec3 violet = vec3(0.42, 0.22, 0.92);
    vec3 cyan = vec3(0.0, 0.82, 1.0);
    vec3 pearl = vec3(0.92, 0.98, 1.0);

    float line = smoothstep(0.035, 0.22, caustic * u_intensity);
    float shimmer = smoothstep(0.0, 0.95, abs(softWave));
    float refraction = smoothstep(0.08, 0.42, softWave) * 0.28;

    vec3 color = mix(deepInk, violet, line * 0.35);
    color = mix(color, cyan, shimmer * 0.45);
    color += pearl * refraction;
    color += cyan * caustic * u_glow * u_intensity;

    float alpha = clamp((line * 0.22 + shimmer * 0.18 + refraction) * u_intensity, 0.0, 0.55);
    gl_FragColor = vec4(color, alpha);
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const useWaterRippleRenderer = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const isClient = typeof window !== "undefined";
    if (!canvas || !isClient) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const settings = coarsePointer.matches
      ? MOBILE_RIPPLE_SETTINGS
      : DESKTOP_RIPPLE_SETTINGS;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        powerPreference: "high-performance",
      }) ?? null;

    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();

    if (!vertexShader || !fragmentShader || !program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const pixelRatioLocation = gl.getUniformLocation(program, "u_pixelRatio");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");
    const viscosityLocation = gl.getUniformLocation(program, "u_viscosity");
    const speedLocation = gl.getUniformLocation(program, "u_speed");
    const frequencyLocation = gl.getUniformLocation(program, "u_frequency");
    const blurLocation = gl.getUniformLocation(program, "u_blur");
    const glowLocation = gl.getUniformLocation(program, "u_glow");
    const ripplesLocation = gl.getUniformLocation(program, "u_ripples");

    if (!positionBuffer || positionLocation < 0) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);

    const rippleData = new Float32Array(DESKTOP_RIPPLE_SETTINGS.maxRipples * 4);
    let rippleIndex = 0;
    let animationFrame = 0;
    let isRunning = false;
    let isVisible = !document.hidden;
    let isHoveringInteractive = false;
    let lastDropTime = 0;
    let lastPointerTime = 0;
    let lastFrameTime = performance.now();
    let lastHoverCheck = 0;
    let lastDropX = window.innerWidth * 0.5;
    let lastDropY = window.innerHeight * 0.5;
    let latestRippleTime = 0;
    let hasPointer = false;

    const pointer = {
      x: lastDropX,
      y: lastDropY,
      smoothX: lastDropX,
      smoothY: lastDropY,
      active: false,
    };

    const clearCanvas = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    const writeRipple = (x: number, y: number, strength = 1, time = performance.now()) => {
      const now = time * 0.001;
      const offset = (rippleIndex % settings.maxRipples) * 4;
      const hoverStrength = isHoveringInteractive ? settings.hoverBoost : 1;

      rippleData[offset] = x / Math.max(window.innerWidth, 1);
      rippleData[offset + 1] = 1 - y / Math.max(window.innerHeight, 1);
      rippleData[offset + 2] = now;
      rippleData[offset + 3] = strength * hoverStrength;
      rippleIndex += 1;
      latestRippleTime = time;
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, settings.dpr);
      const width = Math.max(1, Math.floor(window.innerWidth * pixelRatio));
      const height = Math.max(1, Math.floor(window.innerHeight * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, width, height);
      clearCanvas();
    };

    const render = (frameTime: number) => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      const deltaSeconds = Math.min((frameTime - lastFrameTime) / 1000, 0.05);
      lastFrameTime = frameTime;
      const ease = 1 - Math.exp(-settings.trackingEase * deltaSeconds);

      pointer.smoothX += (pointer.x - pointer.smoothX) * ease;
      pointer.smoothY += (pointer.y - pointer.smoothY) * ease;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, frameTime * 0.001);
      gl.uniform1f(pixelRatioLocation, Math.min(window.devicePixelRatio || 1, settings.dpr));
      gl.uniform1f(
        intensityLocation,
        settings.intensity * (isHoveringInteractive ? 1.1 : 1),
      );
      gl.uniform1f(viscosityLocation, settings.viscosity);
      gl.uniform1f(speedLocation, settings.speed);
      gl.uniform1f(frequencyLocation, settings.frequency);
      gl.uniform1f(blurLocation, settings.blur);
      gl.uniform1f(glowLocation, settings.glow);
      gl.uniform4fv(ripplesLocation, rippleData);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      const pointerIsMoving = frameTime - lastPointerTime < settings.idleDelay;
      const ripplesAreFading = frameTime - latestRippleTime < settings.fadeDuration;

      if (pointerIsMoving || ripplesAreFading) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

      clearCanvas();
      isRunning = false;
      pointer.active = false;
      isHoveringInteractive = false;
    };

    const wakeRenderer = (time = performance.now()) => {
      if (isRunning || !isVisible) return;

      isRunning = true;
      lastFrameTime = time;
      animationFrame = window.requestAnimationFrame(render);
    };

    const updatePointer = (
      clientX: number,
      clientY: number,
      target: EventTarget | null,
      force = false,
    ) => {
      const now = performance.now();
      const isFirstPointerMove = !hasPointer;

      if (isFirstPointerMove) {
        pointer.smoothX = clientX;
        pointer.smoothY = clientY;
        lastDropX = clientX;
        lastDropY = clientY;
        hasPointer = true;
      }

      pointer.x = clientX;
      pointer.y = clientY;
      pointer.active = true;
      lastPointerTime = now;

      if (force || now - lastHoverCheck > settings.hoverCheckInterval) {
        isHoveringInteractive =
          target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
        lastHoverCheck = now;
      }

      const distance = Math.hypot(clientX - lastDropX, clientY - lastDropY);
      const interval = isHoveringInteractive
        ? settings.minInterval * 0.72
        : settings.minInterval;

      // Distance and interval throttling prevents noisy pointer streams from flooding the GPU.
      if (
        force ||
        isFirstPointerMove ||
        (distance > settings.trailDistance && now - lastDropTime > interval)
      ) {
        const velocity = Math.min(distance / 110, 1.25);
        const rippleX = isFirstPointerMove
          ? clientX
          : pointer.smoothX + (clientX - pointer.smoothX) * 0.62;
        const rippleY = isFirstPointerMove
          ? clientY
          : pointer.smoothY + (clientY - pointer.smoothY) * 0.62;

        writeRipple(rippleX, rippleY, settings.intensity * (0.58 + velocity * 0.3), now);
        lastDropX = clientX;
        lastDropY = clientY;
        lastDropTime = now;
        wakeRenderer(now);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY, event.target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY, event.target, true);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      isHoveringInteractive = false;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastDropTime = performance.now();
        wakeRenderer();
      } else {
        window.cancelAnimationFrame(animationFrame);
        isRunning = false;
        clearCanvas();
      }
    };

    resize();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);

      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [canvasRef]);
};

export const WaterRippleCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useWaterRippleRenderer(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen opacity-80"
    />
  );
};
