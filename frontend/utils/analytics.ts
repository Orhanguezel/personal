'use client';

interface MetaPixelFunction {
  (...args: unknown[]): void;
  queue: unknown[][];
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    dataLayer?: Object[];
    fbq?: MetaPixelFunction;
  }
}

export function trackGenerateLead(leadSource: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    lead_source: leadSource,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
  window.fbq?.('track', 'Lead', { content_name: leadSource });
}

export function trackContactIntent(intent: 'phone_click' | 'email_click' | 'whatsapp_click') {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: intent,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
}
