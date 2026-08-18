const COUNTRY_KEY = 'gtc_country'

// Pide el país una sola vez al aterrizar (lo da Vercel via /api/geo) y lo
// guarda en sessionStorage para adjuntarlo a los leads. A prueba de fallos:
// si algo falla, no guarda nada y el lead simplemente queda sin país (como hoy).
export async function captureCountry(): Promise<void> {
  try {
    if (sessionStorage.getItem(COUNTRY_KEY)) return
    const res = await fetch('/api/geo')
    if (!res.ok) return
    const data = await res.json()
    if (data?.country) sessionStorage.setItem(COUNTRY_KEY, data.country)
  } catch {
    // silencioso a propósito: nunca debe romper la navegación ni el formulario
  }
}

export function getCountry(): string | undefined {
  try {
    return sessionStorage.getItem(COUNTRY_KEY) || undefined
  } catch {
    return undefined
  }
}
