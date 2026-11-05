/**
 * Google Analytics 4 (GA4) Integration for Marvol s.r.o.
 * Compliant with Google Consent Mode v2 and Next.js Pages Router.
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-YH051CYNV3';

// Augment window object with gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Log pageview on Next.js client-side route changes
 */
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

/**
 * Log custom analytics event
 */
export interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export const event = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

/**
 * Track high-value Lead Conversion event in GA4
 */
export const trackLeadConversion = (leadData: {
  source?: string;
  service?: string;
  value?: number;
}) => {
  event({
    action: 'generate_lead',
    category: 'engagement',
    label: leadData.service || 'Fotovoltika',
    value: leadData.value || 0,
    lead_source: leadData.source || 'website',
  });
};

/**
 * Update Google Consent Mode v2 based on user cookie preferences
 */
export const updateGtagConsent = (preferences: {
  analytics: boolean;
  marketing: boolean;
}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied',
    });
  }
};
