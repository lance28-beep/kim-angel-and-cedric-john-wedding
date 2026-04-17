import fs from "fs";
import path from "path";
import sharp from "sharp";

const TARGET_DIRECTORIES = [
  path.resolve(process.cwd(), "public", "desktop-background"),
  path.resolve(process.cwd(), "public", "mobile-background"),
  path.resolve(process.cwd(), "public", "boxes"),
];

const VALID_INPUT_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

async function convertImageToWebp(inputPath: string, quality: number = 80): Promise<void> {
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(path.dirname(inputPath), `${baseName}.webp`);

  if (fs.existsSync(outputPath)) {
    return; // skip if already converted
  }

  const image = sharp(inputPath, { failOn: "none" });
  await image.webp({ quality }).toFile(outputPath);
}

function collectImagePathsRecursively(directoryPath: string): string[] {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectImagePathsRecursively(fullPath));
      continue;
    }

    if (entry.isFile() && VALID_INPUT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main(): Promise<void> {
  const missingDirectories = TARGET_DIRECTORIES.filter((directoryPath) => !fs.existsSync(directoryPath));
  if (missingDirectories.length > 0) {
    for (const missingPath of missingDirectories) {
      console.error(`Directory not found: ${missingPath}`);
    }
    process.exit(1);
  }

  const targets = TARGET_DIRECTORIES.flatMap((directoryPath) => collectImagePathsRecursively(directoryPath));

  if (targets.length === 0) {
    console.log("No JPG/PNG images found to convert in target directories.");
    return;
  }

  console.log(`Converting ${targets.length} images to WebP from target directories...`);

  let converted = 0;
  for (const file of targets) {
    try {
      await convertImageToWebp(file, 82);
      converted += 1;
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }

  console.log(`Done. Converted ${converted}/${targets.length} images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


