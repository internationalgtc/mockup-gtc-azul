export function trackLead(source: string) {
  // GA4
  window.gtag?.('event', 'generate_lead', { event_category: source })
  // Google Ads — AW-18022609299 (add /CONVERSION_LABEL when conversion action is created in Ads Manager)
  window.gtag?.('event', 'conversion', { send_to: 'AW-18022609299' })
  // Meta Pixel
  window.fbq?.('track', 'Lead', { content_name: source })
}
