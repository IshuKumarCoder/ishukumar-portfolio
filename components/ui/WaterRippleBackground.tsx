"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, createPortal, useThree, Canvas } from "@react-three/fiber";
import { Points, PointMaterial, useFBO } from "@react-three/drei";
import * as THREE from "three";

const MAX_RIPPLES = 50;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform vec4 uRipples[50];
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;

// procedural noise for premium feel
float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash12(i + vec2(0.0,0.0)), hash12(i + vec2(1.0,0.0)), u.x),
               mix(hash12(i + vec2(0.0,1.0)), hash12(i + vec2(1.0,1.0)), u.x), u.y);
}

void main() {
  vec2 uv = vUv;
  vec2 displacement = vec2(0.0);
  float height = 0.0;
  
  float aspect = uResolution.x / uResolution.y;
  
  for (int i = 0; i < 50; i++) {
    vec4 ripple = uRipples[i];
    if (ripple.w > 0.0) {
      vec2 rPos = ripple.xy;
      vec2 delta = uv - rPos;
      delta.x *= aspect;
      
      float dist = length(delta);
      float age = ripple.z;
      
      // premium liquid ripples
      float speed = 0.8;
      float freq = 25.0;
      float radius = age * speed;
      
      float envelope = max(0.0, 1.0 - abs(dist - radius) * 4.0);
      float damping = max(0.0, 1.0 - age / 3.0); // ripple fades out smoothly
      
      float wave = sin((dist - radius) * freq);
      float displacementAmt = wave * envelope * damping * ripple.w;
      
      height += displacementAmt;
      
      if (dist > 0.0) {
        displacement += (delta / dist) * displacementAmt * 0.02; // strength of distortion
      }
    }
  }
  
  vec2 distortedUv = uv + displacement;
  
  // Base background (Dark modern UI)
  vec3 bg = mix(uColor1, uColor2, distortedUv.y + noise(distortedUv * 4.0 + uTime * 0.1) * 0.1);
  
  // Subtle Grid
  vec2 grid = fract(distortedUv * 20.0);
  float line = smoothstep(0.98, 1.0, grid.x) + smoothstep(0.98, 1.0, grid.y);
  bg += vec3(0.1, 0.1, 0.15) * line * 0.15;
  
  // Particles texture
  vec4 particleColor = texture2D(tDiffuse, distortedUv);
  
  // Mix in particles (additive blending from FBO)
  vec3 finalColor = bg + particleColor.rgb;
  
  // Add highlight/shadow for the ripple
  vec3 lightDir = normalize(vec3(1.0, 1.0, 0.5));
  vec3 normal = normalize(vec3(-displacement.x, -displacement.y, 0.05));
  float diff = max(dot(normal, lightDir), 0.0);
  float spec = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 30.0);
  
  finalColor += vec3(0.6, 0.8, 1.0) * diff * length(displacement) * 5.0; // subtle blueish highlight
  finalColor += vec3(1.0, 1.0, 1.0) * spec * length(displacement) * 20.0; // sharp specular
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const Particles = () => {
  const ref = useRef<THREE.Points>(null!);
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = Math.cbrt(Math.random()) * 2.5; 
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const RipplePostProcessing = () => {
  const { gl, camera, size } = useThree();
  const renderTarget = useFBO();
  
  const [particleScene] = useState(() => new THREE.Scene());
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  
  const ripples = useRef<THREE.Vector4[]>(
    Array(MAX_RIPPLES).fill(null).map(() => new THREE.Vector4(0, 0, 0, 0))
  );
  const rippleIndex = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const movementTimeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      isMoving.current = true;
      if (movementTimeout.current) clearTimeout(movementTimeout.current);
      movementTimeout.current = setTimeout(() => {
        isMoving.current = false;
      }, 100);

      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight);
      
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Spawn ripple if cursor moved enough (intelligent performance)
      if (dist > 0.01) {
        ripples.current[rippleIndex.current].set(x, y, 0.0, 1.0);
        rippleIndex.current = (rippleIndex.current + 1) % MAX_RIPPLES;
        lastMousePos.current = { x, y };
      }
    };
    
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (movementTimeout.current) clearTimeout(movementTimeout.current);
    };
  }, []);

  useFrame((state, delta) => {
    let hasActiveRipples = false;

    // Update ripple ages
    for (let i = 0; i < MAX_RIPPLES; i++) {
      const r = ripples.current[i];
      if (r.w > 0) {
        hasActiveRipples = true;
        r.z += delta; // age
        if (r.z > 3.0) { // max age
          r.w = 0; // inactive
        }
      }
    }
    
    // Render particles to FBO (always render to keep particles moving)
    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(particleScene, camera);
    gl.setRenderTarget(null);
    
    // Update uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.tDiffuse.value = renderTarget.texture;
    }
  });

  return (
    <>
      {createPortal(<Particles />, particleScene)}
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            tDiffuse: { value: null },
            uRipples: { value: ripples.current },
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uColor1: { value: new THREE.Color("#030305") }, // Matches .dark --background
            uColor2: { value: new THREE.Color("#0f172a") } // Matches .dark --secondary
          }}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </>
  );
};

export const WaterRippleBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
      >
        <RipplePostProcessing />
      </Canvas>
    </div>
  );
};
