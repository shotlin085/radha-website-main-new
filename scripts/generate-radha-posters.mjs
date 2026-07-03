import fs from 'fs';
import path from 'path';

const SEQUENCES_DIR = path.join(process.cwd(), 'public/assets/radha/sequences');
const POSTERS_DIR = path.join(process.cwd(), 'public/assets/radha/posters');

const SEQUENCES = [
  { id: '01-radha-reveal', end: 300 },
  { id: '02-scan-product-truth', end: 300 },
  { id: '03-retail-operations', end: 300 },
  { id: '04-private-owner-dashboard', end: 300 },
  { id: '05-complete-ecosystem', end: 255 }
];

function generatePosters() {
  console.log('Generating posters...');
  
  if (!fs.existsSync(POSTERS_DIR)) {
    fs.mkdirSync(POSTERS_DIR, { recursive: true });
  }

  for (const seq of SEQUENCES) {
    const seqDir = path.join(SEQUENCES_DIR, seq.id);
    
    // Some zips might extract as 001.jpg, others as 1.jpg, but we padded them to 001.jpg in the previous script.
    const initialFramePath = path.join(seqDir, '001.jpg');
    const finalFramePath = path.join(seqDir, String(seq.end).padStart(3, '0') + '.jpg');

    const targetInitial = path.join(POSTERS_DIR, `${seq.id}-initial.jpg`);
    const targetFinal = path.join(POSTERS_DIR, `${seq.id}-final.jpg`);

    if (fs.existsSync(initialFramePath)) {
      fs.copyFileSync(initialFramePath, targetInitial);
    } else {
      console.warn(`Initial frame missing for ${seq.id}`);
    }

    if (fs.existsSync(finalFramePath)) {
      fs.copyFileSync(finalFramePath, targetFinal);
    } else {
      console.warn(`Final frame missing for ${seq.id} at ${finalFramePath}`);
    }
  }

  console.log('Posters generation complete.');
}

generatePosters();
