export function trackLead(source: string) {
  // GA4
  window.gtag?.('event', 'generate_lead', { event_category: source })
  // Google Ads — acción de conversión de FORMULARIO/LEAD (AW-18022609299/<label>).
  // La etiqueta se obtuvo del contenedor GTM (GTM-W66STSP6); los tags de GTM no
  // disparan en este sitio React (sus triggers son del sitio WordPress viejo:
  // form_submit nativo / JoinChat / clic-a-teléfono), así que disparamos la
  // conversión directo acá. Antes iba sin label → Ads no la contaba.
  window.gtag?.('event', 'conversion', { send_to: 'AW-18022609299/e2oZCKrri5McEJPj7JFD' })
  // Meta Pixel
  window.fbq?.('track', 'Lead', { content_name: source })
}
