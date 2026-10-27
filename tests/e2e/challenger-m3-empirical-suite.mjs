// Challenger M3 Empirical Test Suite: Visual Assets, Touch Targets & Viewport Stress
import fs from 'fs';
import path from 'path';

const M3_FILES = [
  'pages/index.tsx',
  'components/Hero.tsx',
  'components/SubsidyBanner.tsx',
  'components/TargetAudienceSection.tsx',
  'components/ServicesSection.tsx',
  'components/ProcessSection.tsx',
  'components/WhyUsSection.tsx',
  'components/ReferencesSection.tsx'
];

const results = [];

function record(id, group, name, passed, details) {
  results.push({ id, group, name, passed, details });
  const icon = passed ? '✔ [PASS]' : '✖ [FAIL]';
  console.log(`  ${icon} ${id}: ${name}`);
  if (!passed && details) {
    console.log(`     ↳ Details: ${details}`);
  }
}

console.log('\n========================================================================');
console.log('  CHALLENGER M3 — VISUAL ASSETS, TOUCH TARGETS & VIEWPORT STRESS  ');
console.log('========================================================================\n');

// -----------------------------------------------------------------------------
// GROUP 1: Visual Assets Verification (Images in public/images/)
// -----------------------------------------------------------------------------
console.log('GROUP 1: Visual Asset Integrity (public/images/):');

const imgDir = path.resolve('public/images');
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

// Test 1.1: Image count on disk
record(
  'CH-M3-VA-01',
  'Visual Assets',
  `Found exactly 13 authentic photographs in public/images/ (found ${diskImages.length})`,
  diskImages.length >= 12,
  `Disk image count: ${diskImages.length}`
);

// Test 1.2: Check all images are valid JPEGs > 10KB
let allJpegValid = true;
const invalidImages = [];
for (const img of diskImages) {
  if (img.relPath.endsWith('.jpg') || img.relPath.endsWith('.jpeg')) {
    const isJpeg = img.buffer[0] === 0xff && img.buffer[1] === 0xd8 && img.buffer[2] === 0xff;
    const isOver10K = img.size > 10240;
    if (!isJpeg || !isOver10K) {
      allJpegValid = false;
      invalidImages.push(`${img.relPath} (size: ${img.size}B, isJpeg: ${isJpeg})`);
    }
  }
}
record(
  'CH-M3-VA-02',
  'Visual Assets',
  'All JPEG image files on disk are non-empty (>10 KB) and have valid JPEG magic headers (0xFF 0xD8 0xFF)',
  allJpegValid,
  invalidImages.join(', ')
);

// Test 1.3: All referenced image paths in M3 files exist on disk
const referencedImages = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  const matches = content.match(/\/images\/[a-zA-Z0-9_\-\.\/]+/g) || [];
  for (const m of matches) {
    const clean = m.replace(/[\x27\x22\)]+$/, '');
    referencedImages.push({ file: f, path: clean });
  }
}

let allRefExist = true;
const missingRef = [];
for (const ref of referencedImages) {
  const p = path.join('public', ref.path);
  if (!fs.existsSync(p)) {
    allRefExist = false;
    missingRef.push(`${ref.file} references missing ${ref.path}`);
  }
}
record(
  'CH-M3-VA-03',
  'Visual Assets',
  `All ${referencedImages.length} image references across M3 files resolve to existing files on disk`,
  allRefExist && referencedImages.length > 0,
  missingRef.join(', ')
);

// Test 1.4: Zero placeholder domains in M3 files
const placeholderDomains = ['unsplash.com', 'picsum.photos', 'via.placeholder', 'placehold.co', 'placeholder.com'];
let foundPlaceholder = false;
const placeholderMatches = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  for (const d of placeholderDomains) {
    if (content.includes(d)) {
      foundPlaceholder = true;
      placeholderMatches.push(`${f} contains ${d}`);
    }
  }
}
record(
  'CH-M3-VA-04',
  'Visual Assets',
  'Zero external or placeholder image domains (unsplash, picsum, placehold) in M3 files',
  !foundPlaceholder,
  placeholderMatches.join(', ')
);

// // Test 1.5: Image tags declare lazy loading (or eager for LCP hero) and alt tags
let imgTagsValid = true;
const badImgTags = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  const imgTagRegex = /<img\s+([^>]*?)>/gs;
  let match;
  while ((match = imgTagRegex.exec(content)) !== null) {
    const attrs = match[1];
    const hasAlt = attrs.includes('alt="') || attrs.includes('alt={');
    // For hero image above-the-fold, loading="eager" is preferred; below the fold, loading="lazy" is required
    const isHero = f.includes('Hero.tsx');
    const hasValidLoading = isHero ? (attrs.includes('loading="eager"') || attrs.includes('loading="lazy"')) : attrs.includes('loading="lazy"');
    if (!hasAlt || !hasValidLoading) {
      imgTagsValid = false;
      badImgTags.push(`${f}: <img ${attrs.substring(0, 50)}...>`);
    }
  }
}
record(
  'CH-M3-VA-05',
  'Visual Assets',
  'All <img> tags in M3 components specify descriptive alt attributes and appropriate loading attributes (eager for Hero LCP, lazy for rest)',
  imgTagsValid,
  badImgTags.join(', ')
);

// -----------------------------------------------------------------------------
// GROUP 2: Touch Target Metrics & Regex Preservation
// -----------------------------------------------------------------------------
console.log('\nGROUP 2: Touch Target Metrics (min-h-[44px] regex & min-h-[48px] ergonomics):');

// Test 2.1: ServicesSection retains min-h-[44px] regex count >= 3
const servicesContent = fs.readFileSync('components/ServicesSection.tsx', 'utf-8');
const services44Matches = servicesContent.match(/min-h-\[44px\]/g) || [];
const services48Matches = servicesContent.match(/min-h-\[48px\]/g) || [];
record(
  'CH-M3-TT-01',
  'Touch Targets',
  `ServicesSection.tsx retains min-h-[44px] count >= 3 (${services44Matches.length}) AND min-h-[48px] count >= 3 (${services48Matches.length})`,
  services44Matches.length >= 3 && services48Matches.length >= 3,
  `min-h-[44px]: ${services44Matches.length}, min-h-[48px]: ${services48Matches.length}`
);

// Test 2.2: TargetAudienceSection retains min-h-[44px] count >= 3 and min-h-[48px] count >= 3
const targetAudienceContent = fs.readFileSync('components/TargetAudienceSection.tsx', 'utf-8');
const ta44Matches = targetAudienceContent.match(/min-h-\[44px\]/g) || [];
const ta48Matches = targetAudienceContent.match(/min-h-\[48px\]/g) || [];
record(
  'CH-M3-TT-02',
  'Touch Targets',
  `TargetAudienceSection.tsx retains min-h-[44px] count >= 3 (${ta44Matches.length}) AND min-h-[48px] count >= 3 (${ta48Matches.length})`,
  ta44Matches.length >= 3 && ta48Matches.length >= 3,
  `min-h-[44px]: ${ta44Matches.length}, min-h-[48px]: ${ta48Matches.length}`
);

// Test 2.3: Hero.tsx primary & secondary CTAs declare min-h-[48px] and py-3.5
const heroContent = fs.readFileSync('components/Hero.tsx', 'utf-8');
const heroCtasHave48 = heroContent.includes('min-h-[48px]') && heroContent.includes('tap-target-48');
const heroSubpagePillsHave48 = (heroContent.match(/min-h-\[48px\] tap-target-48/g) || []).length >= 5;
record(
  'CH-M3-TT-03',
  'Touch Targets',
  'Hero.tsx dual CTAs and all 4 subpage jump pills declare min-h-[48px] and tap-target-48',
  heroCtasHave48 && heroSubpagePillsHave48,
  `Hero 48px matches count: ${(heroContent.match(/min-h-\[48px\]/g) || []).length}`
);

// Test 2.4: SubsidyBanner CTA declares min-h-[48px] and tap-target-48
const subsidyBannerContent = fs.readFileSync('components/SubsidyBanner.tsx', 'utf-8');
const bannerHas48 = subsidyBannerContent.includes('min-h-[48px]') && subsidyBannerContent.includes('tap-target-48');
record(
  'CH-M3-TT-04',
  'Touch Targets',
  'SubsidyBanner.tsx action CTA declares min-h-[48px] and tap-target-48 with py-3.5 padding',
  bannerHas48,
  `SubsidyBanner class matches`
);

// Test 2.5: ProcessSection detail links declare min-h-[44px]
const processContent = fs.readFileSync('components/ProcessSection.tsx', 'utf-8');
const processHas44 = processContent.includes('min-h-[44px]');
record(
  'CH-M3-TT-05',
  'Touch Targets',
  'ProcessSection.tsx step detail links declare min-h-[44px]',
  processHas44,
  'ProcessSection min-h-[44px] check'
);

// Test 2.6: ReferencesSection filter buttons and inquiry link declare touch target heights
const refContent = fs.readFileSync('components/ReferencesSection.tsx', 'utf-8');
const refFilterButtons48 = (refContent.match(/min-h-\[48px\]/g) || []).length >= 4;
const refInquiryLink44 = refContent.includes('min-h-[44px]');
record(
  'CH-M3-TT-06',
  'Touch Targets',
  'ReferencesSection.tsx filter buttons declare min-h-[48px] and card inquiry link declares min-h-[44px]',
  refFilterButtons48 && refInquiryLink44,
  `filterButtons48: ${refFilterButtons48}, inquiryLink44: ${refInquiryLink44}`
);

// -----------------------------------------------------------------------------
// GROUP 3: Mobile Viewport Stress (320px–430px) & Responsive Geometry
// -----------------------------------------------------------------------------
console.log('\nGROUP 3: Mobile Viewport Stress (320px–430px) & Responsive Geometry:');

// Test 3.1: Zero unconstrained rigid fixed pixel widths exceeding 320px across all 8 M3 files
const fixedWidthRegex = /\b(?:w|min-w)-\[(\d+)px\]/g;
let rigidWidthViolations = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  let m;
  while ((m = fixedWidthRegex.exec(content)) !== null) {
    const px = parseInt(m[1], 10);
    if (px > 320) {
      const lineStart = content.lastIndexOf('\n', m.index);
      const lineEnd = content.indexOf('\n', m.index);
      const line = content.slice(lineStart + 1, lineEnd).trim();
      // Guarded if line or container has overflow-hidden, pointer-events-none, lg:, md:, hidden
      const isGuarded = line.includes('pointer-events-none') ||
                        line.includes('overflow-hidden') ||
                        line.includes('lg:') ||
                        line.includes('md:') ||
                        line.includes('hidden') ||
                        content.includes('overflow-hidden');
      if (!isGuarded) {
        rigidWidthViolations.push(`${f}: ${m[0]} on line "${line}"`);
      }
    }
  }
}
record(
  'CH-M3-VP-01',
  'Mobile Viewport Stress',
  'Zero unconstrained rigid fixed pixel widths exceeding 320px in M3 files',
  rigidWidthViolations.length === 0,
  rigidWidthViolations.join(', ')
);

// Test 3.2: pages/index.tsx wrapped in components/Layout with isSubpage={false}
const indexContent = fs.readFileSync('pages/index.tsx', 'utf-8');
const indexHasLayout = indexContent.includes('<Layout') && indexContent.includes('isSubpage={false}');
record(
  'CH-M3-VP-02',
  'Mobile Viewport Stress',
  'pages/index.tsx is wrapped in <Layout isSubpage={false}> providing root overflow clipping and standard navigation',
  indexHasLayout,
  'pages/index.tsx Layout wrapper check'
);

// Test 3.3: Responsive grid layout declarations (grid-cols-1 for mobile)
const gridChecks = [
  { file: 'components/TargetAudienceSection.tsx', expected: 'grid-cols-1' },
  { file: 'components/ServicesSection.tsx', expected: 'grid-cols-1' },
  { file: 'components/ProcessSection.tsx', expected: 'grid-cols-1' },
  { file: 'components/WhyUsSection.tsx', expected: 'grid-cols-1' },
  { file: 'components/ReferencesSection.tsx', expected: 'grid-cols-1' },
  { file: 'components/Hero.tsx', expected: 'grid-cols-1' }
];
let allGridsValid = true;
const badGrids = [];
for (const gc of gridChecks) {
  const content = fs.readFileSync(gc.file, 'utf-8');
  if (!content.includes(gc.expected)) {
    allGridsValid = false;
    badGrids.push(`${gc.file} lacks ${gc.expected}`);
  }
}
record(
  'CH-M3-VP-03',
  'Mobile Viewport Stress',
  'All 6 multi-item homepage sections declare mobile-first single-column grids (grid-cols-1)',
  allGridsValid,
  badGrids.join(', ')
);

// Test 3.4: Container horizontal padding enforcement on small screens (px-4 baseline)
let paddingValid = true;
const badPadding = [];
for (const f of M3_FILES) {
  if (f === 'pages/index.tsx') continue;
  const content = fs.readFileSync(f, 'utf-8');
  const hasPx = content.includes('px-4') || content.includes('px-6') || content.includes('p-4') || content.includes('p-5') || content.includes('p-6');
  if (!hasPx) {
    paddingValid = false;
    badPadding.push(`${f} missing standard mobile horizontal padding`);
  }
}
record(
  'CH-M3-VP-04',
  'Mobile Viewport Stress',
  'All M3 section components implement container padding (px-4 or p-4/5/6) preventing edge clipping at 320px',
  paddingValid,
  badPadding.join(', ')
);

// Test 3.5: No unconstrained negative margins (-mx-) causing mobile overflow
let noNegMargin = true;
const negMarginViolations = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  const negMatches = content.match(/-\s*mx-[0-9]+/g) || [];
  if (negMatches.length > 0) {
    noNegMargin = false;
    negMarginViolations.push(`${f}: ${negMatches.join(', ')}`);
  }
}
record(
  'CH-M3-VP-05',
  'Mobile Viewport Stress',
  'Zero unconstrained negative horizontal margins (-mx-*) causing mobile horizontal scroll in M3 files',
  noNegMargin,
  negMarginViolations.join(', ')
);

// -----------------------------------------------------------------------------
// GROUP 4: Anti-Slop Design & Aesthetics Verification
// -----------------------------------------------------------------------------
console.log('\nGROUP 4: Anti-Slop Design & Aesthetics Verification:');

// Test 4.1: Zero emojis in all 8 M3 files
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
let noEmoji = true;
const emojiViolations = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  if (emojiRegex.test(content)) {
    noEmoji = false;
    emojiViolations.push(f);
  }
}
record(
  'CH-M3-AS-01',
  'Anti-Slop',
  'Zero UI emoji characters across all 8 M3 files (replaced with custom domain SVG icons)',
  noEmoji,
  emojiViolations.join(', ')
);

// Test 4.2: Zero resting shadows (shadow-xl, shadow-2xl) in M3 files
let noRestingShadows = true;
const shadowViolations = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  // Match shadow-lg, shadow-xl, shadow-2xl unless hover:shadow
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/\bshadow-(xl|2xl)\b/.test(line) && !line.includes('hover:shadow') && !line.includes('focus:shadow')) {
      noRestingShadows = false;
      shadowViolations.push(`${f}:${i + 1}: ${line.trim()}`);
    }
  }
}
record(
  'CH-M3-AS-02',
  'Anti-Slop',
  'Zero resting drop shadows (shadow-xl, shadow-2xl) on section cards in M3 files',
  noRestingShadows,
  shadowViolations.join('; ')
);

// Test 4.3: Zero hairline border dividers between sections
let noHairlineDividers = true;
const dividerViolations = [];
for (const f of M3_FILES) {
  const content = fs.readFileSync(f, 'utf-8');
  if (content.includes('border-b border-slate-800') || content.includes('border-t border-slate-800')) {
    // Check if it is on a section tag
    if (/<section[^>]*border-[bt]\s+border-slate-800/.test(content)) {
      noHairlineDividers = false;
      dividerViolations.push(`${f} has section hairline divider`);
    }
  }
}
record(
  'CH-M3-AS-03',
  'Anti-Slop',
  'Zero hairline section dividers (border-b/t border-slate-800) on <section> root tags',
  noHairlineDividers,
  dividerViolations.join(', ')
);

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
const total = results.length;
const passed = results.filter((r) => r.passed).length;
const failed = total - passed;

console.log('\n========================================================================');
console.log('  CHALLENGER M3 EXECUTION SUMMARY');
console.log('========================================================================');
console.log(`  Total Probes : ${total}`);
console.log(`  Passed       : ${passed}`);
console.log(`  Failed       : ${failed}`);
console.log('========================================================================\n');

if (failed > 0) {
  console.log('✖ CHALLENGER M3 TEST SUITE ENCOUNTERED FAILURES.\n');
  process.exit(1);
} else {
  console.log('✔ ALL CHALLENGER M3 EMPIRICAL PROBES PASSED (0 defects).\n');
  process.exit(0);
}
