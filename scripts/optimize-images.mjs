import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const TARGETS = [path.join(ROOT, 'src/assets'), path.join(ROOT, 'server/uploads')];
const MAX_WIDTH = 1000;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (/\.png$/i.test(entry.name)) {
      yield full;
    }
  }
}

let totalBefore = 0;
let totalAfter = 0;

for (const dir of TARGETS) {
  for await (const file of walk(dir)) {
    const before = (await fs.stat(file)).size;
    const image = sharp(file);
    const meta = await image.metadata();

    let pipeline = sharp(file);
    if (meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH });
    }
    const buffer = await pipeline.png({ compressionLevel: 9, effort: 10, palette: true }).toBuffer();

    if (buffer.length < before) {
      await fs.writeFile(file, buffer);
      const after = buffer.length;
      totalBefore += before;
      totalAfter += after;
      console.log(
        `${path.relative(ROOT, file)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${meta.width}x${meta.height} -> ${MAX_WIDTH < meta.width ? MAX_WIDTH : meta.width}px)`
      );
    } else {
      totalBefore += before;
      totalAfter += before;
      console.log(`${path.relative(ROOT, file)}: mantido (já otimizado, ${(before / 1024).toFixed(0)}KB)`);
    }
  }
}

console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
