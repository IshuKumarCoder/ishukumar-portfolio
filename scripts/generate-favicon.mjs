import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "profile_pic.png");

async function createCircularIcon(size, outputPath) {
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`
  );

  await sharp(src)
    .resize(size, size, { fit: "cover", position: "top" })
    .composite([{ input: circleSvg, blend: "dest-in" }])
    .png()
    .toFile(outputPath);
}

await createCircularIcon(512, join(root, "app", "icon.png"));
await createCircularIcon(180, join(root, "app", "apple-icon.png"));
await createCircularIcon(180, join(root, "public", "apple-icon.png"));
await createCircularIcon(32, join(root, "public", "favicon.png"));

console.log("Circular favicons generated.");
