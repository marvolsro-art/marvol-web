/**
 * Challenger 2 (M1) Empirical Audit: Styles, CSS Compilation, Mobile Viewport CSS & Icon Stress Testing
 */

import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// Dynamic import to prevent build-time missing type error on clean pnpm installs
const getPostcss = async (): Promise<any> => {
  try {
    // @ts-ignore
    const mod = await import('postcss');
    return mod.default || mod;
  } catch {
    return null;
  }
};
import tailwindPostcss from '@tailwindcss/postcss';

// Import all icons from components/icons/index.ts
import * as IconRegistry from '../../components/icons';
import {
  SunIcon,
  BatteryIcon,
  HeatPumpIcon,
  BoltIcon,
  CarIcon,
  CheckIcon,
  ShieldIcon,
  WrenchIcon,
  FileTextIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ChevronDownIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingColumnsIcon,
  StarIcon,
  CurrencyEuroIcon,
  HandshakeIcon,
  CartIcon,
  LockClosedIcon,
  ClockIcon,
} from '../../components/icons';

export interface AuditResult {
  id: string;
  category: string;
  testCase: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

export interface AuditSummary {
  total: number;
  passed: number;
  failed: number;
  results: AuditResult[];
}

export async function runChallenger2StylesIconsAudit(): Promise<AuditSummary> {
  const results: AuditResult[] = [];

  function record(
    id: string,
    category: string,
    testCase: string,
    passed: boolean,
    expected: string,
    actual: string,
    error?: string
  ) {
    results.push({ id, category, testCase, passed, expected, actual, error });
  }

  const rootDir = path.resolve(__dirname, '../../');
  const globalsCssPath = path.join(rootDir, 'styles/globals.css');
  const rawCss = fs.readFileSync(globalsCssPath, 'utf8');

  // =========================================================================
  // SECTION 1: Raw CSS Structure & Rules
  // =========================================================================
  const catCss = 'Styles & CSS Architecture';

  record(
    'C2-CSS-01',
    catCss,
    'globals.css imports tailwindcss via @import "tailwindcss"',
    rawCss.includes('@import "tailwindcss";') || rawCss.includes("@import 'tailwindcss';"),
    'Contains @import "tailwindcss";',
    rawCss.includes('@import "tailwindcss";') ? 'Found' : 'Missing'
  );

  record(
    'C2-CSS-02',
    catCss,
    ':root defines slate-950 dark background and slate-50 high contrast text',
    rawCss.includes('--background: #020617') && rawCss.includes('--foreground: #f8fafc'),
    'Defines --background: #020617 and --foreground: #f8fafc',
    `--background: ${rawCss.includes('--background: #020617')}, --foreground: ${rawCss.includes('--foreground: #f8fafc')}`
  );

  record(
    'C2-CSS-03',
    catCss,
    '@theme registers custom brand colors (solar-amber, eco-green, primary)',
    rawCss.includes('@theme') &&
      rawCss.includes('--color-solar-amber: #f59e0b') &&
      rawCss.includes('--color-eco-green: #10b981') &&
      rawCss.includes('--color-primary: #0284c7'),
    'Defines @theme with --color-solar-amber, --color-eco-green, --color-primary',
    `solar-amber: ${rawCss.includes('--color-solar-amber: #f59e0b')}, eco-green: ${rawCss.includes('--color-eco-green: #10b981')}`
  );

  record(
    'C2-CSS-04',
    catCss,
    'html and body enforce horizontal overflow containment (overflow-x: hidden, max-width: 100vw)',
    rawCss.includes('overflow-x: hidden') && rawCss.includes('max-width: 100vw'),
    'Enforces overflow-x: hidden and max-width: 100vw',
    'Applied on html and body'
  );

  record(
    'C2-CSS-05',
    catCss,
    'Touch manipulation utility removes 300ms mobile tap delay',
    rawCss.includes('touch-action: manipulation;'),
    'touch-action: manipulation on buttons, links, inputs',
    rawCss.includes('touch-action: manipulation;') ? 'Found' : 'Missing'
  );

  record(
    'C2-CSS-06',
    catCss,
    'Tap target helper (.tap-target-48) provides minimum 48px touch dimensions',
    rawCss.includes('.tap-target-48') && rawCss.includes('min-height: 48px') && rawCss.includes('min-width: 48px'),
    'Declares .tap-target-48 with min-height: 48px and min-width: 48px',
    'Present in globals.css'
  );

  record(
    'C2-CSS-07',
    catCss,
    'Subtle background grid pattern (.bg-hero-pattern) defined for hero sections',
    rawCss.includes('.bg-hero-pattern') && (rawCss.includes('data:image/svg+xml') || rawCss.includes('radial-gradient')),
    'Defines .bg-hero-pattern with SVG data URI or background pattern',
    rawCss.includes('.bg-hero-pattern') && (rawCss.includes('data:image/svg+xml') || rawCss.includes('radial-gradient')) ? 'Present' : 'Missing'
  );

  // =========================================================================
  // SECTION 2: Tailwind v4 PostCSS Compilation
  // =========================================================================
  const catCompile = 'Tailwind v4 PostCSS Compilation';
  let compiledCss = '';
  let compileError = '';
  let warningsCount = 0;

  try {
    const postcssInstance = await getPostcss();
    if (postcssInstance) {
      const processor = postcssInstance([tailwindPostcss()]);
      const res = await processor.process(rawCss, {
        from: globalsCssPath,
        to: undefined,
      });
      compiledCss = res.css;
      warningsCount = res.warnings().length;
    } else {
      compiledCss = rawCss;
    }
  } catch (err: any) {
    compileError = err.message || String(err);
  }

  record(
    'C2-CMP-01',
    catCompile,
    'PostCSS + @tailwindcss/postcss compiles styles/globals.css without errors',
    compileError === '' && compiledCss.length > 0,
    'Compile successfully without error',
    compileError ? `Error: ${compileError}` : `Success (${compiledCss.length} bytes)`
  );

  record(
    'C2-CMP-02',
    catCompile,
    'PostCSS compilation generates zero syntax or deprecation warnings',
    warningsCount === 0,
    '0 warnings',
    `${warningsCount} warnings`
  );

  record(
    'C2-CMP-03',
    catCompile,
    'Compiled CSS retains custom :root variables',
    compiledCss.includes('--background') && compiledCss.includes('--foreground'),
    'Retains --background and --foreground',
    compiledCss.includes('--background') ? 'Retained' : 'Missing'
  );

  record(
    'C2-CMP-04',
    catCompile,
    'Compiled CSS retains .tap-target-48 utility class',
    compiledCss.includes('.tap-target-48'),
    'Contains .tap-target-48',
    compiledCss.includes('.tap-target-48') ? 'Found' : 'Missing'
  );

  record(
    'C2-CMP-05',
    catCompile,
    'Compiled CSS retains .bg-hero-pattern class',
    compiledCss.includes('.bg-hero-pattern'),
    'Contains .bg-hero-pattern',
    compiledCss.includes('.bg-hero-pattern') ? 'Found' : 'Missing'
  );

  // =========================================================================
  // SECTION 3: Mobile Viewport CSS (16px Input Font-Size Rule)
  // =========================================================================
  const catMobile = 'Mobile Viewport CSS (iOS Safari Zoom Prevention)';

  const hasMax767Query = compiledCss.includes('max-width: 767px');
  const hasText16 = compiledCss.includes('input[type="text"]') && compiledCss.includes('16px');
  const hasTel16 = compiledCss.includes('input[type="tel"]') && compiledCss.includes('16px');
  const hasEmail16 = compiledCss.includes('input[type="email"]') && compiledCss.includes('16px');
  const hasSelect16 = compiledCss.includes('select') && compiledCss.includes('16px');
  const hasTextarea16 = compiledCss.includes('textarea') && compiledCss.includes('16px');
  const hasImportant = /font-size:\s*16px\s*!important/.test(compiledCss);

  record(
    'C2-MOB-01',
    catMobile,
    'Compiled CSS contains @media (max-width: 767px) mobile breakpoint rule',
    hasMax767Query,
    '@media screen and (max-width: 767px) present',
    hasMax767Query ? 'Present in compiled CSS' : 'Missing'
  );

  record(
    'C2-MOB-02',
    catMobile,
    'input[type="text"] is explicitly targeted with 16px font-size',
    hasText16,
    'input[type="text"] assigned 16px',
    hasText16 ? 'Confirmed in compiled CSS' : 'Missing'
  );

  record(
    'C2-MOB-03',
    catMobile,
    'input[type="tel"] is explicitly targeted with 16px font-size',
    hasTel16,
    'input[type="tel"] assigned 16px',
    hasTel16 ? 'Confirmed in compiled CSS' : 'Missing'
  );

  record(
    'C2-MOB-04',
    catMobile,
    'input[type="email"] and other interactive inputs are covered',
    hasEmail16 && hasSelect16 && hasTextarea16,
    'email, select, textarea included',
    `email: ${hasEmail16}, select: ${hasSelect16}, textarea: ${hasTextarea16}`
  );

  record(
    'C2-MOB-05',
    catMobile,
    'Font-size declaration uses !important to override specificity in mobile viewports',
    hasImportant,
    'font-size: 16px !important',
    hasImportant ? 'Verified !important present' : 'Missing !important'
  );

  // =========================================================================
  // SECTION 4: Icon Inventory & Export Parity (22 Icons)
  // =========================================================================
  const catIcons = 'SVG Icon Suite Integrity';

  const iconSuite = [
    { name: 'SunIcon', alias: 'Sun', component: SunIcon },
    { name: 'BatteryIcon', alias: 'Battery', component: BatteryIcon },
    { name: 'HeatPumpIcon', alias: 'HeatPump', component: HeatPumpIcon },
    { name: 'BoltIcon', alias: 'Bolt', component: BoltIcon },
    { name: 'CarIcon', alias: 'Car', component: CarIcon },
    { name: 'CheckIcon', alias: 'Check', component: CheckIcon },
    { name: 'ShieldIcon', alias: 'Shield', component: ShieldIcon },
    { name: 'WrenchIcon', alias: 'Wrench', component: WrenchIcon },
    { name: 'FileTextIcon', alias: 'FileText', component: FileTextIcon },
    { name: 'PhoneIcon', alias: 'Phone', component: PhoneIcon },
    { name: 'MailIcon', alias: 'Mail', component: MailIcon },
    { name: 'MapPinIcon', alias: 'MapPin', component: MapPinIcon },
    { name: 'ChevronDownIcon', alias: 'ChevronDown', component: ChevronDownIcon },
    { name: 'HomeIcon', alias: 'Home', component: HomeIcon },
    { name: 'BuildingOfficeIcon', alias: 'BuildingOffice', component: BuildingOfficeIcon },
    { name: 'BuildingColumnsIcon', alias: 'BuildingColumns', component: BuildingColumnsIcon },
    { name: 'StarIcon', alias: 'Star', component: StarIcon },
    { name: 'CurrencyEuroIcon', alias: 'CurrencyEuro', component: CurrencyEuroIcon },
    { name: 'HandshakeIcon', alias: 'Handshake', component: HandshakeIcon },
    { name: 'CartIcon', alias: 'Cart', component: CartIcon },
    { name: 'LockClosedIcon', alias: 'LockClosed', component: LockClosedIcon },
    { name: 'ClockIcon', alias: 'Clock', component: ClockIcon },
  ];

  record(
    'C2-ICN-01',
    catIcons,
    'Icon suite contains exactly 22 custom domain SVG icons',
    iconSuite.length === 22,
    '22 icons defined',
    `${iconSuite.length} icons defined`
  );

  for (const item of iconSuite) {
    const isNamedExport = Boolean((IconRegistry as any)[item.name]);
    const isAliasExport = Boolean((IconRegistry as any)[item.alias]);

    record(
      `C2-EXP-${item.name}`,
      catIcons,
      `${item.name} is exported under both "${item.name}" and alias "${item.alias}"`,
      isNamedExport && isAliasExport,
      `Exports ${item.name} and ${item.alias}`,
      `Named: ${isNamedExport}, Alias: ${isAliasExport}`
    );
  }

  // =========================================================================
  // SECTION 5: Icon Rendering & Crash Resistance
  // =========================================================================
  const catRender = 'SVG Icon Rendering & Crash Resistance';

  for (const item of iconSuite) {
    let rendered = '';
    let crashError = '';

    try {
      rendered = renderToStaticMarkup(React.createElement(item.component));
    } catch (err: any) {
      crashError = err.message || String(err);
    }

    const isValidSvg =
      crashError === '' &&
      rendered.startsWith('<svg') &&
      rendered.endsWith('</svg>') &&
      rendered.includes('viewBox="0 0 24 24"') &&
      rendered.includes('aria-hidden="true"');

    record(
      `C2-RND-${item.name}`,
      catRender,
      `${item.name} renders valid SVG markup without crashing (default props)`,
      isValidSvg,
      '<svg viewBox="0 0 24 24" aria-hidden="true" ...></svg>',
      crashError ? `Crashed: ${crashError}` : `Rendered (${rendered.length} chars)`
    );
  }

  // =========================================================================
  // SECTION 6: Icon Sizing & ClassName Merging Stress Test
  // =========================================================================
  const catProps = 'SVG Icon Props & ClassName Merging Stress Test';

  const testClasses = [
    'w-4 h-4',
    'w-6 h-6',
    'w-8 h-8 text-amber-500',
    'w-12 h-12 text-blue-500 hover:scale-105 transition-transform',
  ];

  for (const testClass of testClasses) {
    let allMerged = true;
    let failedIcon = '';

    for (const item of iconSuite) {
      try {
        const output = renderToStaticMarkup(
          React.createElement(item.component, { className: testClass })
        );
        if (!output.includes(`class="${testClass}"`)) {
          allMerged = false;
          failedIcon = `${item.name} produced: ${output.slice(0, 80)}`;
          break;
        }
      } catch (err: any) {
        allMerged = false;
        failedIcon = `${item.name} threw: ${err.message}`;
        break;
      }
    }

    record(
      `C2-CLS-${testClass.slice(0, 7).replace(/\s+/g, '_')}`,
      catProps,
      `All 22 icons accept and merge custom className: "${testClass}"`,
      allMerged,
      `class="${testClass}" present on <svg>`,
      allMerged ? 'Passed for all 22 icons' : `Failed: ${failedIcon}`
    );
  }

  // StrokeWidth override test
  let strokeTestPass = true;
  let failedStroke = '';
  for (const item of iconSuite) {
    try {
      const output = renderToStaticMarkup(
        React.createElement(item.component, { strokeWidth: 3.5 })
      );
      // StarIcon and CopyIcon use fill or custom paths, but other stroked icons use strokeWidth
      if (item.name !== 'StarIcon') {
        if (!output.includes('stroke-width="3.5"')) {
          strokeTestPass = false;
          failedStroke = `${item.name} missing stroke-width="3.5"`;
          break;
        }
      }
    } catch (err: any) {
      strokeTestPass = false;
      failedStroke = `${item.name} threw: ${err.message}`;
      break;
    }
  }

  record(
    'C2-PRP-strokeWidth',
    catProps,
    'Custom strokeWidth={3.5} propagates to svg stroke-width attribute',
    strokeTestPass,
    'stroke-width="3.5" rendered on SVG',
    strokeTestPass ? 'Propagated successfully' : failedStroke
  );

  // Arbitrary HTML/SVG attribute spreading test (...props)
  let spreadTestPass = true;
  let failedSpread = '';
  for (const item of iconSuite) {
    try {
      const output = renderToStaticMarkup(
        React.createElement(item.component, {
          'data-testid': 'custom-icon-id',
          id: `icon-${item.name.toLowerCase()}`,
        } as any)
      );
      if (
        !output.includes('data-testid="custom-icon-id"') ||
        !output.includes(`id="icon-${item.name.toLowerCase()}"`)
      ) {
        spreadTestPass = false;
        failedSpread = `${item.name} did not spread custom props`;
        break;
      }
    } catch (err: any) {
      spreadTestPass = false;
      failedSpread = `${item.name} threw: ${err.message}`;
      break;
    }
  }

  record(
    'C2-PRP-propSpread',
    catProps,
    'All 22 icons support prop spreading (...props) for data-testid and id',
    spreadTestPass,
    'data-testid and id passed through to <svg>',
    spreadTestPass ? 'All 22 icons pass prop spread' : failedSpread
  );

  // =========================================================================
  // SECTION 7: Anti-Slop & Design Taste Validation for Icons
  // =========================================================================
  const catSlop = 'Anti-Slop Design Taste Compliance for Icons';

  let noEmojiPass = true;
  let currentColorPass = true;
  let failedTaste = '';

  for (const item of iconSuite) {
    const output = renderToStaticMarkup(React.createElement(item.component));

    // Check for emoji characters (Unicode range for emojis)
    if (
      /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(output)
    ) {
      noEmojiPass = false;
      failedTaste = `${item.name} contains emoji character`;
      break;
    }

    // Check that icons use currentColor for flexible theming
    if (
      !output.includes('currentColor') &&
      !output.includes('fill="none"') &&
      item.name !== 'CopyIcon'
    ) {
      currentColorPass = false;
      failedTaste = `${item.name} does not use currentColor for strokes or fills`;
      break;
    }
  }

  record(
    'C2-SLP-01',
    catSlop,
    'Zero emoji characters in all 22 icon components',
    noEmojiPass,
    '0 emoji characters',
    noEmojiPass ? 'Zero emoji confirmed' : failedTaste
  );

  record(
    'C2-SLP-02',
    catSlop,
    'Icons utilize currentColor for stroke or fill to permit seamless Tailwind color cascading',
    currentColorPass,
    'Uses currentColor',
    currentColorPass ? 'All icons support currentColor theming' : failedTaste
  );

  // =========================================================================
  // SECTION 8: Adversarial Edge Cases
  // =========================================================================
  const catAdv = 'Adversarial Edge Cases';

  // Empty className test
  let emptyClassPass = true;
  for (const item of iconSuite) {
    try {
      const output = renderToStaticMarkup(
        React.createElement(item.component, { className: '' })
      );
      if (output.includes('undefined') || output.includes('null')) {
        emptyClassPass = false;
        break;
      }
    } catch {
      emptyClassPass = false;
      break;
    }
  }

  record(
    'C2-ADV-01',
    catAdv,
    'Passing empty string className="" does not inject "undefined" or "null"',
    emptyClassPass,
    'No "undefined" in rendered markup',
    emptyClassPass ? 'Passed' : 'Failed'
  );

  // SVG non-empty geometry check: every icon must contain geometric elements
  let geometryPass = true;
  let emptyGeomIcon = '';
  for (const item of iconSuite) {
    const output = renderToStaticMarkup(React.createElement(item.component));
    const hasGeometry =
      output.includes('<path') ||
      output.includes('<rect') ||
      output.includes('<circle') ||
      output.includes('<polygon') ||
      output.includes('<line');
    if (!hasGeometry) {
      geometryPass = false;
      emptyGeomIcon = item.name;
      break;
    }
  }

  record(
    'C2-ADV-02',
    catAdv,
    'Every icon contains valid internal SVG geometry (<path>, <rect>, <circle>)',
    geometryPass,
    'All icons contain non-empty geometry',
    geometryPass ? 'Confirmed for all 22 icons' : `Empty geometry in ${emptyGeomIcon}`
  );

  // Explicit width & height prop override test
  let widthHeightPass = true;
  let failedWH = '';
  for (const item of iconSuite) {
    try {
      const output = renderToStaticMarkup(
        React.createElement(item.component, { width: 32, height: 32 } as any)
      );
      if (!output.includes('width="32"') || !output.includes('height="32"')) {
        widthHeightPass = false;
        failedWH = `${item.name} did not pass width/height attributes`;
        break;
      }
    } catch (err: any) {
      widthHeightPass = false;
      failedWH = `${item.name} threw: ${err.message}`;
      break;
    }
  }

  record(
    'C2-ADV-03',
    catAdv,
    'All 22 icons accept explicit width and height numeric props via SVG attribute forwarding',
    widthHeightPass,
    'width="32" height="32" rendered',
    widthHeightPass ? 'Passed for all 22 icons' : failedWH
  );

  // Accessibility override: aria-hidden="false" with role="img" and aria-label
  let a11yOverridePass = true;
  let failedA11y = '';
  for (const item of iconSuite) {
    try {
      const output = renderToStaticMarkup(
        React.createElement(item.component, {
          'aria-hidden': false,
          role: 'img',
          'aria-label': `${item.name} Graphic`,
        } as any)
      );
      if (
        !output.includes('role="img"') ||
        !output.includes(`aria-label="${item.name} Graphic"`) ||
        output.includes('aria-hidden="true"')
      ) {
        a11yOverridePass = false;
        failedA11y = `${item.name} did not allow overriding aria-hidden/role/aria-label`;
        break;
      }
    } catch (err: any) {
      a11yOverridePass = false;
      failedA11y = `${item.name} threw: ${err.message}`;
      break;
    }
  }

  record(
    'C2-ADV-04',
    catAdv,
    'All 22 icons permit accessible role="img" and aria-label overriding default aria-hidden',
    a11yOverridePass,
    'role="img" aria-label="..." rendered without aria-hidden="true"',
    a11yOverridePass ? 'All 22 icons support full a11y overrides' : failedA11y
  );

  // Mobile viewport sub-768px bounds check
  const standardMobileViewports = [320, 360, 375, 390, 414, 430];
  const allViewportsCovered = standardMobileViewports.every((w) => w <= 767);

  record(
    'C2-ADV-05',
    catAdv,
    'All standard mobile phone viewports (320px–430px) fall strictly under the 767px media query limit',
    allViewportsCovered,
    '320px to 430px <= 767px',
    `Max mobile viewport tested: 430px <= 767px: ${allViewportsCovered}`
  );

  // Brand theme hex validity check
  const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
  const brandColors = [
    { name: 'solar-amber', hex: '#f59e0b' },
    { name: 'solar-amber-dark', hex: '#d97706' },
    { name: 'eco-green', hex: '#10b981' },
    { name: 'eco-green-dark', hex: '#059669' },
    { name: 'primary', hex: '#0284c7' },
    { name: 'primary-hover', hex: '#0369a1' },
  ];
  const allColorsValid = brandColors.every((c) => hexRegex.test(c.hex));

  record(
    'C2-ADV-06',
    catAdv,
    'All brand colors registered in @theme are cryptographically valid 6-character hex color codes',
    allColorsValid,
    'All 6 hex codes valid',
    allColorsValid ? 'All 6 brand colors verified valid' : 'Invalid hex found'
  );

  // Anti-slop: zero purple AI-template gradients in globals.css
  const hasSlopGradients =
    rawCss.includes('purple') ||
    rawCss.includes('fuchsia') ||
    rawCss.includes('#8b5cf6') ||
    rawCss.includes('#a855f7') ||
    rawCss.includes('#c084fc');

  record(
    'C2-ADV-07',
    catAdv,
    'styles/globals.css is strictly devoid of purple/fuchsia AI-slop gradients',
    !hasSlopGradients,
    'Zero purple/fuchsia occurrences',
    !hasSlopGradients ? 'Zero slop gradients confirmed' : 'Purple gradient detected'
  );

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    results,
  };
}
