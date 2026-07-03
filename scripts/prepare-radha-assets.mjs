import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SOURCE_DIR = path.join(process.cwd(), 'source-assets/radha/original-zips');
const TARGET_DIR = path.join(process.cwd(), 'public/assets/radha/sequences');

const SEQUENCES = [
  { file: 'RADHA reveal : hero.zip', id: '01-radha-reveal', maxFrames: 300 },
  { file: 'Scan to product truth.zip', id: '02-scan-product-truth', maxFrames: 300 },
  { file: 'Retail operations engine.zip', id: '03-retail-operations', maxFrames: 300 },
  { file: 'Private data → owner dashboard.zip', id: '04-private-owner-dashboard', maxFrames: 300 },
  { file: 'Complete ecosystem : final assembly.zip', id: '05-complete-ecosystem', maxFrames: 255 } // CRITICAL RESTRICTION
];

function prepareAssets() {
  console.log('Starting asset preparation...');
  
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  for (const seq of SEQUENCES) {
    const zipPath = path.join(SOURCE_DIR, seq.file);
    if (!fs.existsSync(zipPath)) {
      console.error(`Missing archive: ${seq.file}. Validation failed.`);
      process.exit(1);
    }

    const seqDir = path.join(TARGET_DIR, seq.id);
    if (!fs.existsSync(seqDir)) {
      fs.mkdirSync(seqDir, { recursive: true });
    }

    console.log(`Extracting ${seq.id}...`);
    try {
      execSync(`unzip -o -q "${zipPath}" -d "${seqDir}"`);
    } catch (err) {
      console.error(`Failed to extract ${seq.file}`, err);
    }

    // Enforce safe frames and rename them to standard format
    const extractedFiles = fs.readdirSync(seqDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    let deletedCount = 0;
    
    for (const file of extractedFiles) {
      const match = file.match(/(\d+)/);
      if (match) {
        const frameNum = parseInt(match[1], 10);
        if (frameNum > seq.maxFrames) {
          fs.unlinkSync(path.join(seqDir, file));
          deletedCount++;
        } else {
          // Normalize names if necessary, e.g. ensure 001.jpg
          const ext = path.extname(file);
          const newName = String(frameNum).padStart(3, '0') + ext;
          if (file !== newName) {
            fs.renameSync(path.join(seqDir, file), path.join(seqDir, newName));
          }
        }
      }
    }
    
    if (deletedCount > 0) {
      console.log(`Enforced safe limits for ${seq.id}: deleted ${deletedCount} unsafe frames.`);
    }
  }

  console.log('Asset preparation complete.');
}

prepareAssets();
