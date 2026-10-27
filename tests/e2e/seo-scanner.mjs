import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('pages');

function scanDir(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanDir(full));
    } else if (entry.name.endsWith('.tsx') && !entry.name.startsWith('_') && entry.name !== 'test-2.tsx') {
      files.push(full);
    }
  }
  return files;
}

const pageFiles = scanDir(pagesDir);

console.log(`Found ${pageFiles.length} production page files to audit for SEO:\n`);

const results = [];

for (const file of pageFiles) {
  const rel = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');

  // Title extract
  const titleMatch = content.match(/title=["']([^"']+)["']/) || content.match(/<title[^>]*>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : null;

  // Description extract
  const descMatch = content.match(/description=["']([^"']+)["']/) || content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/);
  const desc = descMatch ? descMatch[1] : null;

  // Canonical extract
  const canMatch = content.match(/canonicalPath=["']([^"']+)["']/) || content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/);
  const canonical = canMatch ? canMatch[1] : null;

  // H1 extract
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1Count = h1Matches.length;
  const h1Text = h1Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));

  // Schema extract
  const hasSchema = content.includes('schema={') || content.includes('application/ld+json');

  // Images extract
  const imgTags = [...content.matchAll(/<img[^>]*>/gi)].map(m => m[0]);
  const imgsWithoutAlt = imgTags.filter(img => !img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''"));

  // Check Slovak PV Keywords
  const keywords = ['fotovoltik', 'dotáci', 'zelená domácnostiam', 'bater', 'tepelné čerpadl', 'záruka', 'cena', 'výkon'];
  const matchedKeywords = keywords.filter(kw => content.toLowerCase().includes(kw));

  results.push({
    file: rel,
    title,
    titleLen: title ? title.length : 0,
    desc,
    descLen: desc ? desc.length : 0,
    canonical,
    h1Count,
    h1Text,
    hasSchema,
    totalImages: imgTags.length,
    missingAltImages: imgsWithoutAlt.length,
    matchedKeywordsCount: matchedKeywords.length
  });
}

console.log(JSON.stringify(results, null, 2));
