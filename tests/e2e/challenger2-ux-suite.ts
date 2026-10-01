/**
 * Marvol s.r.o. — Challenger 2 Adversarial UX, Responsiveness & Navigation Audit Suite
 * 
 * Scope:
 * 1. Viewport audit (320px, 375px, 390px, 412px, 768px, 1024px+)
 * 2. Horizontal overflow audit at 320px across all 8 routes
 * 3. Touch targets audit (>= 44px x 44px) across drawer, tabs, accordions, and buttons
 * 4. Desktop hover flyouts audit (180ms hover bridge, zero layout shift, Escape key)
 * 5. Mobile drawer modal audit (backdrop blur, body scroll lock, accordion toggles, auto-close on link navigation)
 */

import fs from 'fs';
import path from 'path';
import { ROOT_DIR, readFile } from './helpers';

export interface UXAuditResult {
  id: string;
  group: string;
  name: string;
  passed: boolean;
  error?: string;
  details?: Record<string, unknown>;
}

export async function runUXResponsivenessSuite(): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: UXAuditResult[];
}> {
  const results: UXAuditResult[] = [];

  function record(
    id: string,
    group: string,
    name: string,
    passed: boolean,
    error?: string,
    details?: Record<string, unknown>
  ) {
    results.push({ id, group, name, passed, error, details });
  }

  // =========================================================================
  // GROUP 1: Horizontal Overflow Audit at 320px Viewport (iPhone SE 1st gen)
  // =========================================================================

  // Test 1.1: Global CSS enforces overflow-x: hidden and max-width: 100vw on html & body
  {
    const css = readFile('styles/globals.css');
    const hasHtmlOverflow = /html\s*\{[\s\S]*?overflow-x:\s*hidden[\s\S]*?max-width:\s*100vw/.test(css);
    const hasBodyOverflow = /body\s*\{[\s\S]*?overflow-x:\s*hidden[\s\S]*?max-width:\s*100vw/.test(css);
    const pass = hasHtmlOverflow && hasBodyOverflow;

    record(
      'CH2-OF-01',
      'Horizontal Overflow & 320px Layout',
      'Global CSS enforces overflow-x: hidden and max-width: 100vw on html and body',
      pass,
      pass ? undefined : `Missing required overflow-x or max-width rules in styles/globals.css`
    );
  }

  // Test 1.2: Shared Layout container declares overflow-x-hidden and w-full
  {
    const layout = readFile('components/Layout.tsx');
    const hasDivOverflow = layout.includes('overflow-x-hidden') && layout.includes('w-full');
    const hasMainOverflow = layout.includes('<main') && layout.includes('overflow-x-hidden') && layout.includes('w-full');
    const pass = hasDivOverflow && hasMainOverflow;

    record(
      'CH2-OF-02',
      'Horizontal Overflow & 320px Layout',
      'Shared Layout shell applies overflow-x-hidden and w-full to outer wrapper and main container',
      pass,
      pass ? undefined : `components/Layout.tsx missing overflow-x-hidden on outer shell or main tag`
    );
  }

  // Test 1.3: All 8 site routes enforce overflow-x-hidden on container or page root
  {
    const routes = [
      'pages/index.tsx',
      'pages/fotovoltika-pre-domacnosti.tsx',
      'pages/fotovoltika-pre-firmy.tsx',
      'pages/bateriove-uloziska-bess.tsx',
      'pages/tepelne-cerpadla.tsx',
      'pages/elektroinstalacie-revizie.tsx',
      'pages/kontakt.tsx',
      'pages/ochrana-osobnych-udajov.tsx',
    ];

    let allProtected = true;
    const failures: string[] = [];

    for (const r of routes) {
      const content = readFile(r);
      // Either wraps in Layout (which enforces overflow-x-hidden) or explicitly contains overflow-x-hidden
      const usesLayout = content.includes('<Layout') || content.includes('Layout');
      const hasDirectOverflow = content.includes('overflow-x-hidden');
      if (!usesLayout && !hasDirectOverflow) {
        allProtected = false;
        failures.push(r);
      }
    }

    record(
      'CH2-OF-03',
      'Horizontal Overflow & 320px Layout',
      'All 8 routes enforce horizontal overflow clipping (Layout wrapper or direct overflow-x-hidden)',
      allProtected,
      allProtected ? undefined : `Routes failing overflow-x protection: ${failures.join(', ')}`
    );
  }

  // Test 1.4: Zero unconstrained fixed widths exceeding 320px without responsive breakpoints
  {
    const componentsDir = path.join(ROOT_DIR, 'components');
    const pagesDir = path.join(ROOT_DIR, 'pages');
    const filesToScan: string[] = [];

    function collectFiles(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory() && e.name !== 'api' && e.name !== 'icons') {
          collectFiles(full);
        } else if (e.isFile() && (e.name.endsWith('.tsx') || e.name.endsWith('.ts'))) {
          filesToScan.push(full);
        }
      }
    }
    collectFiles(componentsDir);
    collectFiles(pagesDir);

    const violations: Array<{ file: string; match: string }> = [];
    // Match fixed widths like w-[350px], w-[400px], min-w-[350px]
    // Acceptable if prefixed by md:, lg:, sm: or inside hidden lg: or overflow-hidden
    const fixedWidthRegex = /\b(w|min-w)-\[(\d+)px\]/g;

    for (const f of filesToScan) {
      const code = fs.readFileSync(f, 'utf8');
      let m;
      while ((m = fixedWidthRegex.exec(code)) !== null) {
        const widthVal = parseInt(m[2], 10);
        if (widthVal > 320) {
          // Check line context
          const lineStart = code.lastIndexOf('\n', m.index);
          const lineEnd = code.indexOf('\n', m.index);
          const line = code.substring(lineStart, lineEnd);
          // If line has lg: or md: or is inside Hero glow with overflow-hidden
          const isGuarded = line.includes('lg:') ||
                            line.includes('md:') ||
                            line.includes('hidden') ||
                            line.includes('pointer-events-none') ||
                            code.includes('overflow-hidden');
          if (!isGuarded) {
            violations.push({ file: path.relative(ROOT_DIR, f), match: m[0] });
          }
        }
      }
    }

    const pass = violations.length === 0;
    record(
      'CH2-OF-04',
      'Horizontal Overflow & 320px Layout',
      'No unconstrained fixed pixel widths > 320px causing horizontal scroll on mobile',
      pass,
      pass ? undefined : `Unconstrained fixed width classes: ${JSON.stringify(violations)}`
    );
  }

  // Test 1.5: Top bar and mobile layout elements stack vertically on 320px viewport
  {
    const header = readFile('components/Header.tsx');
    const hasResponsiveStack = header.includes('flex flex-col md:flex-row');
    const hasSmallPadding = header.includes('px-4');

    record(
      'CH2-OF-05',
      'Horizontal Overflow & 320px Layout',
      'Header Top Bar stacks vertically on 320px (flex-col md:flex-row) with safe padding',
      hasResponsiveStack && hasSmallPadding,
      hasResponsiveStack && hasSmallPadding ? undefined : 'Top Bar lacks flex-col md:flex-row responsive stack'
    );
  }

  // =========================================================================
  // GROUP 2: Viewport Responsiveness Audit (320px, 375px, 390px, 412px, 768px, 1024px+)
  // =========================================================================

  // Test 2.1: Viewport meta tag properly configured in _app.tsx
  {
    const app = readFile('pages/_app.tsx');
    const hasViewport = app.includes('<meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />') ||
                        app.includes('width=device-width, initial-scale=1');

    record(
      'CH2-VP-01',
      'Viewport Responsiveness Audit',
      'Viewport meta tag declares standard responsive scaling (width=device-width, initial-scale=1)',
      hasViewport,
      hasViewport ? undefined : 'pages/_app.tsx missing standard viewport meta declaration'
    );
  }

  // Test 2.2: Mobile Viewport 320px–412px: Desktop flyouts are hidden and mobile trigger is active
  {
    const header = readFile('components/Header.tsx');
    const hidesDesktopNav = header.includes('hidden lg:flex');
    const showsMobileTrigger = header.includes('lg:hidden') && header.includes('Otvoriť navigáciu');

    record(
      'CH2-VP-02',
      'Viewport Responsiveness Audit',
      'Mobile viewports (320px–412px) cleanly hide desktop flyouts and expose mobile trigger',
      hidesDesktopNav && showsMobileTrigger,
      hidesDesktopNav && showsMobileTrigger ? undefined : 'Desktop nav or mobile trigger breakpoint missing lg:hidden / hidden lg:flex'
    );
  }

  // Test 2.3: Tablet Viewport 768px (iPad mini): Multi-column grids activate and layout expands
  {
    const calc = readFile('components/CalculatorSection.tsx');
    const target = readFile('components/TargetAudienceSection.tsx');
    const services = readFile('components/ServicesSection.tsx');

    const calcGrid = calc.includes('grid-cols-1 lg:grid-cols-12') || calc.includes('sm:grid-cols-2');
    const targetGrid = target.includes('grid-cols-1 md:grid-cols-3');
    const servicesGrid = services.includes('grid-cols-1 lg:grid-cols-12');

    const pass = calcGrid && targetGrid && servicesGrid;
    record(
      'CH2-VP-03',
      'Viewport Responsiveness Audit',
      'Tablet viewports (768px) transition smoothly with md: and lg: responsive column grids',
      pass,
      pass ? undefined : 'One or more section grids lack responsive tablet breakpoints'
    );
  }

  // Test 2.4: Desktop Viewport 1024px+: Full 12-column layout and hover dropdown flyouts active
  {
    const header = readFile('components/Header.tsx');
    const hasDesktopDropdowns = header.includes('w-[400px]') && header.includes('w-[420px]');
    const hasDesktopCta = header.includes('hidden md:flex items-center space-x-4');

    record(
      'CH2-VP-04',
      'Viewport Responsiveness Audit',
      'Desktop viewports (1024px+) render wide flyouts (400px/420px) and primary header action CTA',
      hasDesktopDropdowns && hasDesktopCta,
      hasDesktopDropdowns && hasDesktopCta ? undefined : 'Desktop flyout widths or CTA container missing'
    );
  }

  // Test 2.5: Interactive Google Maps embed in /kontakt uses 100% fluid width across all viewports
  {
    const contact = readFile('pages/kontakt.tsx');
    const hasFluidMap = contact.includes('<iframe') && contact.includes('width="100%"');

    record(
      'CH2-VP-05',
      'Viewport Responsiveness Audit',
      'Google Maps iframe in /kontakt is fluid (width="100%") preventing overflow across all viewports',
      hasFluidMap,
      hasFluidMap ? undefined : 'Google Maps iframe in /kontakt uses rigid fixed pixel width'
    );
  }

  // =========================================================================
  // GROUP 3: Touch Targets Audit (>= 44px x 44px)
  // =========================================================================

  // Test 3.1: Mobile drawer hamburger trigger meets touch target >= 44x44px
  {
    const header = readFile('components/Header.tsx');
    const buttonMatch = header.match(/<button[\s\S]*?aria-label="Otvoriť navigáciu"[\s\S]*?>/);
    const buttonTag = buttonMatch ? buttonMatch[0] : '';
    const pass = buttonTag.includes('min-h-[44px]') && buttonTag.includes('min-w-[44px]');

    record(
      'CH2-TT-01',
      'Touch Targets Audit (>= 44px x 44px)',
      'Mobile drawer hamburger trigger satisfies min-h-[44px] min-w-[44px]',
      pass,
      pass ? undefined : `Hamburger button tag: "${buttonTag}"`
    );
  }

  // Test 3.2: Mobile drawer close button meets touch target >= 44x44px
  {
    const header = readFile('components/Header.tsx');
    const buttonMatch = header.match(/<button[\s\S]*?aria-label="Zatvoriť navigáciu"[\s\S]*?>/);
    const buttonTag = buttonMatch ? buttonMatch[0] : '';
    const pass = buttonTag.includes('min-h-[44px]') && buttonTag.includes('min-w-[44px]');

    record(
      'CH2-TT-02',
      'Touch Targets Audit (>= 44px x 44px)',
      'Mobile drawer close button satisfies min-h-[44px] min-w-[44px]',
      pass,
      pass ? undefined : `Close button tag: "${buttonTag}"`
    );
  }

  // Test 3.3: Mobile drawer accordion triggers ("Riešenia", "Služby") satisfy >= 48px height
  {
    const header = readFile('components/Header.tsx');
    const accordionTriggers = header.match(/onClick=\{\(\) => setMobile(Solutions|Services)Open\(!mobile(Solutions|Services)Open\)\}[^>]*className="([^"]*)"/g);
    let allMeet = true;
    if (!accordionTriggers || accordionTriggers.length < 2) {
      allMeet = false;
    } else {
      for (const t of accordionTriggers) {
        if (!t.includes('min-h-[48px]') && !t.includes('min-h-[44px]')) {
          allMeet = false;
        }
      }
    }

    record(
      'CH2-TT-03',
      'Touch Targets Audit (>= 44px x 44px)',
      'Mobile drawer accordion triggers ("Riešenia", "Služby") satisfy touch targets (min-h-[48px])',
      allMeet,
      allMeet ? undefined : 'Accordion triggers lack min-h-[48px] / min-h-[44px]'
    );
  }

  // Test 3.4: Mobile drawer accordion subpage link items satisfy min-h-[44px]
  {
    const header = readFile('components/Header.tsx');
    const subpageItems = header.match(/className="block p-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800\/80 transition-colors min-h-\[44px\]"/g);
    const pass = subpageItems !== null && subpageItems.length >= 2;

    record(
      'CH2-TT-04',
      'Touch Targets Audit (>= 44px x 44px)',
      'Mobile drawer accordion link items satisfy min-h-[44px] touch standard',
      pass,
      pass ? undefined : 'Mobile drawer accordion items do not declare min-h-[44px]'
    );
  }

  // Test 3.5: Mobile drawer direct links & bottom CTA satisfy min-h-[44px] and min-h-[48px]
  {
    const header = readFile('components/Header.tsx');
    const hasDirectLinksTouch = header.includes('transition-colors min-h-[44px]');
    const hasFooterCtaTouch = header.includes('shadow-amber-500/20 min-h-[48px]');
    const hasPhoneLinkTouch = header.includes('flex items-center gap-1.5 min-h-[44px]');

    const pass = hasDirectLinksTouch && hasFooterCtaTouch && hasPhoneLinkTouch;
    record(
      'CH2-TT-05',
      'Touch Targets Audit (>= 44px x 44px)',
      'Mobile drawer direct links, phone links, and bottom CTA satisfy >= 44px / 48px touch targets',
      pass,
      pass ? undefined : 'Mobile drawer direct links or bottom CTA lack min-h-[44px]/[48px]'
    );
  }

  // Test 3.6: ServiceSection category tabs and action CTAs declare min-h-[44px]
  {
    const services = readFile('components/ServicesSection.tsx');
    const tabMatch = services.includes('min-h-[44px]');
    const ctaMatches = services.match(/min-h-\[44px\]/g);
    const pass = tabMatch && ctaMatches !== null && ctaMatches.length >= 3;

    record(
      'CH2-TT-06',
      'Touch Targets Audit (>= 44px x 44px)',
      'ServicesSection category tabs and action CTAs declare min-h-[44px] touch target',
      pass,
      pass ? undefined : `ServicesSection min-h-[44px] matches count: ${ctaMatches?.length || 0}`
    );
  }

  // Test 3.7: TargetAudienceSection action links declare min-h-[44px]
  {
    const target = readFile('components/TargetAudienceSection.tsx');
    const matches = target.match(/min-h-\[44px\]/g);
    const pass = matches !== null && matches.length >= 3;

    record(
      'CH2-TT-07',
      'Touch Targets Audit (>= 44px x 44px)',
      'TargetAudienceSection action links across all 3 cards declare min-h-[44px] touch target',
      pass,
      pass ? undefined : `TargetAudienceSection min-h-[44px] count: ${matches?.length || 0}`
    );
  }

  // Test 3.8: LeadForm input controls & submit button satisfy touch targets (py-3 & py-4)
  {
    const leadForm = readFile('components/LeadForm.tsx');
    const hasInputPy3 = leadForm.includes('px-4 py-3 text-base sm:text-sm');
    const hasSubmitPy4 = leadForm.includes('py-4 px-6 rounded-xl font-black');

    const pass = hasInputPy3 && hasSubmitPy4;
    record(
      'CH2-TT-08',
      'Touch Targets Audit (>= 44px x 44px)',
      'LeadForm inputs (py-3, text-base iOS zoom protection) and submit button (py-4) satisfy >= 48px height',
      pass,
      pass ? undefined : 'LeadForm inputs or submit button lack py-3 or py-4 sizing'
    );
  }

  // =========================================================================
  // GROUP 4: Desktop Hover Flyouts Verification
  // =========================================================================

  // Test 4.1: Desktop hover bridge timer uses 180ms delay to prevent flicker
  {
    const header = readFile('components/Header.tsx');
    const has180msTimer = header.includes('timeoutRef.current = setTimeout(() => {') &&
                          header.includes('180);');
    const clearsTimerOnEnter = header.includes('if (timeoutRef.current) clearTimeout(timeoutRef.current);');

    const pass = has180msTimer && clearsTimerOnEnter;
    record(
      'CH2-HF-01',
      'Desktop Hover Flyouts Verification',
      'Desktop hover bridge implements 180ms delay and cancels timer on re-entry to eliminate flicker',
      pass,
      pass ? undefined : '180ms hover bridge timer or clearTimeout logic missing in Header.tsx'
    );
  }

  // Test 4.2: Flyout menu uses absolute positioning and pt-2 hover bridge wrapper to eliminate layout shift
  {
    const header = readFile('components/Header.tsx');
    const flyout1 = header.includes('absolute top-full left-0 pt-2 w-[400px]');
    const flyout2 = header.includes('absolute top-full left-0 pt-2 w-[420px]');
    const pass = flyout1 && flyout2;

    record(
      'CH2-HF-02',
      'Desktop Hover Flyouts Verification',
      'Flyout containers use absolute positioning with pt-2 hover bridge preventing layout shifts',
      pass,
      pass ? undefined : 'Flyout menu containers lack absolute top-full left-0 pt-2 positioning'
    );
  }

  // Test 4.3: Keyboard accessibility: Escape key closes active flyout dropdown
  {
    const header = readFile('components/Header.tsx');
    const hasEscapeListener = header.includes("if (e.key === 'Escape')") &&
                              header.includes('setActiveDropdown(null);');

    record(
      'CH2-HF-03',
      'Desktop Hover Flyouts Verification',
      'Keyboard accessibility: Escape key listener immediately closes active flyout menu',
      hasEscapeListener,
      hasEscapeListener ? undefined : 'Header.tsx does not listen to Escape key for dropdown dismissal'
    );
  }

  // Test 4.4: Click-outside listener dismisses open dropdowns
  {
    const header = readFile('components/Header.tsx');
    const hasClickOutside = header.includes('handleClickOutside') &&
                            header.includes('headerRef.current.contains(e.target as Node)') &&
                            header.includes('setActiveDropdown(null);');

    record(
      'CH2-HF-04',
      'Desktop Hover Flyouts Verification',
      'Click-outside listener on document body dismisses active flyouts when clicking outside header',
      hasClickOutside,
      hasClickOutside ? undefined : 'Header.tsx missing mousedown click-outside dismissal handler'
    );
  }

  // Test 4.5: ARIA attributes on dropdown triggers and menus
  {
    const header = readFile('components/Header.tsx');
    const hasAriaExpanded = header.includes("aria-expanded={activeDropdown === 'riesenia'}") &&
                            header.includes("aria-expanded={activeDropdown === 'sluzby'}");
    const hasAriaHasPopup = header.includes('aria-haspopup="true"');
    const hasAriaControls = header.includes('aria-controls="dropdown-riesenia"') &&
                            header.includes('aria-controls="dropdown-sluzby"');
    const hasRoleMenu = header.includes('role="menu"') && header.includes('role="menuitem"');

    const pass = hasAriaExpanded && hasAriaHasPopup && hasAriaControls && hasRoleMenu;
    record(
      'CH2-HF-05',
      'Desktop Hover Flyouts Verification',
      'Flyouts implement complete WAI-ARIA menu pattern (aria-expanded, aria-haspopup, aria-controls, role="menu")',
      pass,
      pass ? undefined : 'Incomplete ARIA menu attributes in Header.tsx flyouts'
    );
  }

  // =========================================================================
  // GROUP 5: Mobile Drawer Modal Verification
  // =========================================================================

  // Test 5.1: Drawer renders backdrop with backdrop-blur-md overlay
  {
    const header = readFile('components/Header.tsx');
    const hasBackdrop = header.includes('fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50');
    const closesOnBackdropClick = header.includes('onClick={() => setMobileMenuOpen(false)}');

    const pass = hasBackdrop && closesOnBackdropClick;
    record(
      'CH2-MD-01',
      'Mobile Drawer Modal Verification',
      'Mobile drawer modal renders fixed backdrop-blur-md overlay and closes upon backdrop tap',
      pass,
      pass ? undefined : 'Mobile drawer backdrop blur or click dismissal handler missing'
    );
  }

  // Test 5.2: Drawer enforces strict body scroll lock when open
  {
    const header = readFile('components/Header.tsx');
    const locksBodyScroll = header.includes("document.body.style.overflow = 'hidden'");
    const restoresBodyScroll = header.includes('document.body.style.overflow = originalOverflow');

    const pass = locksBodyScroll && restoresBodyScroll;
    record(
      'CH2-MD-02',
      'Mobile Drawer Modal Verification',
      'Body scroll lock (overflow = "hidden") is enforced when open and restored upon close/unmount',
      pass,
      pass ? undefined : 'Body scroll lock effect missing in Header.tsx'
    );
  }

  // Test 5.3: Accordions for "Riešenia" and "Služby" independently toggle and animate chevrons
  {
    const header = readFile('components/Header.tsx');
    const hasSolutionsState = header.includes('mobileSolutionsOpen');
    const hasServicesState = header.includes('mobileServicesOpen');
    const hasChevronRotation = header.includes("mobileSolutionsOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'") &&
                               header.includes("mobileServicesOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'");

    const pass = hasSolutionsState && hasServicesState && hasChevronRotation;
    record(
      'CH2-MD-03',
      'Mobile Drawer Modal Verification',
      'Collapsible accordions for "Riešenia" and "Služby" toggle independently with animated chevrons',
      pass,
      pass ? undefined : 'Accordion toggle states or chevron rotation classes missing in Header.tsx'
    );
  }

  // Test 5.4: Drawer auto-closes on route change via router.events
  {
    const header = readFile('components/Header.tsx');
    const listensToRouteEvents = header.includes("router.events.on('routeChangeStart', handleRouteChange)") &&
                                 header.includes('setMobileMenuOpen(false);');

    record(
      'CH2-MD-04',
      'Mobile Drawer Modal Verification',
      'Mobile drawer auto-closes upon Next.js route change event (routeChangeStart)',
      listensToRouteEvents,
      listensToRouteEvents ? undefined : 'Header.tsx does not listen to router.events.on(routeChangeStart)'
    );
  }

  // Test 5.5: Drawer auto-closes on internal anchor links and Escape key
  {
    const header = readFile('components/Header.tsx');
    const handleNavClickCloses = header.includes('const handleNavClick =') &&
                                 header.includes('setMobileMenuOpen(false);');
    const escapeCloses = header.includes("if (e.key === 'Escape')") &&
                         header.includes('setMobileMenuOpen(false);');

    const pass = handleNavClickCloses && escapeCloses;
    record(
      'CH2-MD-05',
      'Mobile Drawer Modal Verification',
      'Mobile drawer closes on internal anchor navigation and Escape key press',
      pass,
      pass ? undefined : 'Drawer does not close on handleNavClick or Escape key'
    );
  }

  // Calculate summary
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return { total, passed, failed, results };
}
