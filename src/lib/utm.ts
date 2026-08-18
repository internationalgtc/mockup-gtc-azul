const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid'] as const
const STORAGE_KEY = 'gtc_utm'
const LANDING_KEY = 'gtc_landing_url'

export function captureUTMs(): void {
  const params = new URLSearchParams(window.location.search)
  const hasUtms = UTM_KEYS.some(k => params.has(k))

  if (hasUtms) {
    const utms: Partial<Record<typeof UTM_KEYS[number], string>> = {}
    for (const key of UTM_KEYS) {
      const val = params.get(key)
      if (val) utms[key] = val
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms))
  }

  if (!sessionStorage.getItem(LANDING_KEY)) {
    sessionStorage.setItem(LANDING_KEY, window.location.href)
  }
}

export function getUTMs(): Record<string, string | undefined> {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    const utms: Partial<Record<string, string>> = stored ? JSON.parse(stored) : {}
    return {
      utm_source: utms['utm_source'],
      utm_medium: utms['utm_medium'],
      utm_campaign: utms['utm_campaign'],
      utm_content: utms['utm_content'],
      gclid: utms['gclid'],
      fbclid: utms['fbclid'],
    }
  } catch {
    return {}
  }
}

export function getLandingUrl(): string {
  return sessionStorage.getItem(LANDING_KEY) ?? window.location.href
}
