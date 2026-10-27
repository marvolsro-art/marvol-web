import fs from 'fs';
import path from 'path';

console.log('========================================================================');
console.log('  CHALLENGER 2 — SUBPAGES VISUAL ASSETS & TOUCH TARGET EMPIRICAL SUITE  ');
console.log('========================================================================\n');

const ROOT_DIR = process.cwd();
const pagesDir = path.join(ROOT_DIR, 'pages');
const publicDir = path.join(ROOT_DIR, 'public');

// Recursively find all page files
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'api') {
        results = results.concat(getFiles(full));
      }
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const pageFiles = getFiles(pagesDir);
console.log(`Auditing ${pageFiles.length} page files in pages/ (excluding pages/api/):\n`);

let testCount = 0;
let failCount = 0;

function report(id, name, passed, details = '') {
  testCount++;
  if (!passed) failCount++;
  const icon = passed ? '✔ [PASS]' : '✖ [FAIL]';
  console.log(`  ${icon} ${id}: ${name}`);
  if (!passed && details) {
    console.log(`     ↳ ${details}`);
  }
}

// -----------------------------------------------------------------------------
// GROUP 1: Physical Image Assets on Disk
// -----------------------------------------------------------------------------
console.log('GROUP 1: Visual Asset Integrity in public/images/:\n');

const imgDir = path.join(publicDir, 'images');
const diskImages = [];
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (/\.(jpe?g|png|webp|svg)$/i.test(entry.name)) {
      const stat = fs.statSync(full);
      const buf = fs.readFileSync(full);
      diskImages.push({
        fullPath: full,
        relPath: path.relative(imgDir, full),
        size: stat.size,
        buffer: buf
      });
    }
  }
}
walkDir(imgDir);

report(
  'CH2-VA-01',
  `Physical image count in public/images/ >= 12 (found: ${diskImages.length})`,
  diskImages.length >= 12,
  `Disk images found: ${diskImages.length}`
);

// Check that all disk JPEG files are > 10KB and have valid JPEG magic bytes
let smallImages = [];
let invalidJpegHeaders = [];
for (const img of diskImages) {
  if (/\.jpe?g$/i.test(img.relPath)) {
    if (img.size <= 10240) {
      smallImages.push(`${img.relPath} (${img.size} bytes)`);
    }
    const buf = img.buffer;
    if (buf[0] !== 0xFF || buf[1] !== 0xD8 || buf[2] !== 0xFF) {
      invalidJpegHeaders.push(img.relPath);
    }
  }
}

report(
  'CH2-VA-02',
  `All JPEG files in public/images/ are > 10 KB (small files: ${smallImages.length})`,
  smallImages.length === 0,
  smallImages.join(', ')
);

report(
  'CH2-VA-03',
  `All JPEG files in public/images/ have valid magic header 0xFF 0xD8 0xFF`,
  invalidJpegHeaders.length === 0,
  invalidJpegHeaders.join(', ')
);

// -----------------------------------------------------------------------------
// GROUP 2: Subpage Image References & Placeholder Domains
// -----------------------------------------------------------------------------
console.log('\nGROUP 2: Subpage Image References & Zero Placeholder Domains:\n');

const imgRegex = /["'`]((\/images\/[a-zA-Z0-9_\-\.\/]+))["'`]/g;
const placeholderRegex = /(unsplash\.com|picsum\.photos|placehold\.it|placeholder\.com|dummyimage\.com)/i;

const allReferences = new Map();
let placeholderViolations = [];

for (const file of pageFiles) {
  const relFile = path.relative(ROOT_DIR, file);
  const content = fs.readFileSync(file, 'utf8');

  // Check placeholder domains
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (placeholderRegex.test(line)) {
      placeholderViolations.push(`${relFile}:${idx + 1}: ${line.trim()}`);
    }
  });

  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const imgPath = match[1];
    // Ignore code or css references that aren't actual image files
    if (/\.(jpe?g|png|webp|svg)$/i.test(imgPath)) {
      if (!allReferences.has(imgPath)) {
        allReferences.set(imgPath, new Set());
      }
      allReferences.get(imgPath).add(relFile);
    }
  }
}

report(
  'CH2-VA-04',
  `Zero placeholder image domains (unsplash, picsum, placehold) in pages/`,
  placeholderViolations.length === 0,
  placeholderViolations.join('; ')
);

let missingFiles = [];
let smallReferencedImages = [];

for (const [imgRef, sources] of allReferences.entries()) {
  const diskPath = path.join(publicDir, imgRef);
  if (!fs.existsSync(diskPath)) {
    missingFiles.push(`${imgRef} (referenced in: ${[...sources].join(', ')})`);
  } else {
    const stat = fs.statSync(diskPath);
    if (stat.size <= 10240) {
      smallReferencedImages.push(`${imgRef} (${stat.size} bytes)`);
    }
  }
}

report(
  'CH2-VA-05',
  `All ${allReferences.size} image references across subpages physically exist in public/`,
  missingFiles.length === 0,
  missingFiles.join('; ')
);

report(
  'CH2-VA-06',
  `All referenced images are non-empty JPEGs/assets > 10 KB`,
  smallReferencedImages.length === 0,
  smallReferencedImages.join('; ')
);

// -----------------------------------------------------------------------------
// GROUP 3: Mobile Viewport & Touch Target Stress Testing on Subpages
// -----------------------------------------------------------------------------
console.log('\nGROUP 3: Mobile Touch Targets & Interactive Controls (>= 44px/48px):\n');

// Specific subpages to verify
const subpages = [
  'pages/fotovoltika-pre-domacnosti.tsx',
  'pages/fotovoltika-pre-firmy.tsx',
  'pages/bateriove-uloziska-bess.tsx',
  'pages/tepelne-cerpadla.tsx',
  'pages/elektroinstalacie-revizie.tsx',
  'pages/eshop.tsx',
  'pages/kontakt.tsx',
  'pages/sluzby/instalacia-montaz.tsx',
  'pages/sluzby/konzultacie-poradenstvo.tsx',
  'pages/sluzby/navrh-projektu.tsx',
  'pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx',
  'pages/sluzby/revizie-dotacie.tsx'
];

for (const subpage of subpages) {
  const fullPath = path.join(ROOT_DIR, subpage);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    report(`CH2-TT-${path.basename(subpage, '.tsx')}`, `${subpage} exists`, false, 'File does not exist');
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  // Check for Layout wrapper or overflow-x-hidden
  const hasLayout = content.includes('<Layout') || content.includes('overflow-x-hidden');
  
  // Check for touch targets: look for min-h-[44px], min-h-[48px], py-3, py-3.5, py-4, or p-3 on buttons/links
  const touchTargetMatches = content.match(/min-h-\[(44px|48px)\]/g) || [];
  const paddingMatches = content.match(/py-(3|3\.5|4|5)/g) || [];
  const totalTouchSignals = touchTargetMatches.length + paddingMatches.length;

  report(
    `CH2-TT-${path.basename(subpage, '.tsx')}`,
    `${subpage} touch targets & overflow protection (found ${touchTargetMatches.length} min-h-[44/48px], ${paddingMatches.length} generous py paddings)`,
    hasLayout && totalTouchSignals > 0,
    `hasLayout=${hasLayout}, totalTouchSignals=${totalTouchSignals}`
  );
}

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n========================================================================');
console.log('  CHALLENGER 2 SUBPAGE AUDIT SUMMARY');
console.log('========================================================================');
console.log(`  Total Probes : ${testCount}`);
console.log(`  Passed       : ${testCount - failCount}`);
console.log(`  Failed       : ${failCount}`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✔ ALL CHALLENGER 2 SUBPAGE AUDIT PROBES PASSED (0 defects).\n');
  process.exit(0);
}
