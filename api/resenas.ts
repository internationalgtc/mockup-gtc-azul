import type { VercelRequest, VercelResponse } from '@vercel/node'

// Las reseñas del perfil de Google Business de GTC.
//
// Va por el servidor y no desde el navegador para que la clave de Google no
// viaje al cliente: una key de Places en el bundle la copia cualquiera y la
// factura la paga GTC. Acá vive en GOOGLE_PLACES_API_KEY, que solo ve Vercel.
//
// SIN la clave configurada esto devuelve 200 con `reviews: []`. Es a propósito:
// el bloque de reseñas del sitio ya funciona a medias sin ella —el botón de
// «déjanos tu reseña» no necesita API— y así la sección no se rompe mientras la
// cuenta de Google Cloud no exista.
//
// Límite de Google, no nuestro: la Places API devuelve como mucho 5 reseñas y
// no deja guardarlas más de 30 días. Por eso no hay base de datos detrás.

const PLACE_ID = 'ChIJZR-nyJgOwoARUkVGDGJIOiY' // Global Talent Connections, Alicante

type ReviewGoogle = {
  author_name?: string
  profile_photo_url?: string
  rating?: number
  relative_time_description?: string
  text?: string
  time?: number
}

export type ResenasPayload = {
  rating: number | null
  total: number
  reviews: Array<{
    autor: string
    foto: string | null
    puntaje: number
    cuando: string
    texto: string
  }>
}

const VACIO: ResenasPayload = { rating: null, total: 0, reviews: [] }

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.GOOGLE_PLACES_API_KEY

  // 6 h en la CDN de Vercel: las reseñas no cambian cada minuto y cada llamada
  // a Places se factura.
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400')

  if (!key) {
    res.status(200).json(VACIO)
    return
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.set('place_id', PLACE_ID)
    url.searchParams.set('fields', 'rating,user_ratings_total,reviews')
    url.searchParams.set('reviews_sort', 'newest')
    url.searchParams.set('language', 'es')
    url.searchParams.set('key', key)

    const r = await fetch(url, { signal: AbortSignal.timeout(8000) })
    const data = await r.json() as {
      status?: string
      result?: { rating?: number; user_ratings_total?: number; reviews?: ReviewGoogle[] }
    }

    // Google contesta 200 con el error adentro (`status`), así que no alcanza
    // con mirar el código HTTP.
    if (data.status !== 'OK' || !data.result) {
      res.status(200).json(VACIO)
      return
    }

    const reviews = (data.result.reviews ?? [])
      .filter((x) => (x.text ?? '').trim().length > 0)
      .map((x) => ({
        autor: x.author_name ?? '',
        foto: x.profile_photo_url ?? null,
        puntaje: typeof x.rating === 'number' ? x.rating : 0,
        cuando: x.relative_time_description ?? '',
        texto: (x.text ?? '').trim(),
      }))

    res.status(200).json({
      rating: typeof data.result.rating === 'number' ? data.result.rating : null,
      total: data.result.user_ratings_total ?? 0,
      reviews,
    } satisfies ResenasPayload)
  } catch {
    // Que Google esté caído no puede tumbar la home.
    res.status(200).json(VACIO)
  }
}
