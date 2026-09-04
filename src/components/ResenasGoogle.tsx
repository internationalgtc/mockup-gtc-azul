import { useEffect, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import { useT, useLang } from '@/hooks/useT'
import { RESENAS_GOOGLE, RESUMEN_GOOGLE } from '@/data/resenasGoogle'

/**
 * Las reseñas de Google del perfil de GTC.
 *
 * Dos mitades que NO dependen una de la otra, a propósito:
 *
 *  - El botón «Déjanos tu reseña» es un enlace al perfil. Funciona siempre, sin
 *    API ni cuenta de Google Cloud, y es el que Romina necesita para sus correos.
 *  - Las reseñas salen de `@/data/resenasGoogle`, escritas a mano. Con 7
 *    opiniones no compensa una cuenta de Google Cloud con facturación, que
 *    además devolvería como mucho 5.
 *
 * `/api/resenas` queda enchufado igual: si algún día existe
 * `GOOGLE_PLACES_API_KEY`, lo que devuelva Google GANA sobre lo escrito acá y
 * las reseñas pasan a actualizarse solas. Sin clave contesta lista vacía y
 * manda lo local. Nadie tiene que tocar este archivo para hacer el cambio.
 */

type Resena = {
  autor: string
  foto: string | null
  puntaje: number
  cuando: string
  texto: string
}

type Payload = { rating: number | null; total: number; reviews: Resena[] }

/** El enlace corto que da el propio panel de Google Business. */
export const ENLACE_RESENA = 'https://g.page/r/CVJFRgxiSDomEBM/review'

const Estrellas = ({ puntaje, size = 16 }: { puntaje: number; size?: number }) => (
  <div className="flex items-center gap-0.5" aria-label={`${puntaje} de 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        className={n <= Math.round(puntaje) ? 'fill-coral text-coral' : 'text-navy/20'}
      />
    ))}
  </div>
)

/**
 * «hace 10 meses» calculado, no escrito: una fecha a mano en el repo envejece
 * sola y termina diciendo «hace 4 semanas» dos años después.
 */
function haceCuanto(iso: string, lang: 'es' | 'en'): string {
  const dias = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (Number.isNaN(dias)) return ''
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  if (dias < 30) return rtf.format(-Math.max(dias, 1), 'day')
  const meses = Math.round(dias / 30.44)
  if (meses < 12) return rtf.format(-meses, 'month')
  return rtf.format(-Math.round(meses / 12), 'year')
}

const Tarjeta = ({ r }: { r: Resena }) => (
  <article className="bg-white rounded-2xl p-6 border border-navy/10 shadow-sm flex flex-col gap-4">
    <div className="flex items-center gap-3">
      {r.foto ? (
        <img
          src={r.foto}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-prime/10 flex items-center justify-center text-blue-prime font-bold">
          {r.autor.charAt(0) || '?'}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-navy font-bold text-sm truncate">{r.autor}</p>
        <p className="text-navy/50 text-xs">{r.cuando}</p>
      </div>
    </div>
    <Estrellas puntaje={r.puntaje} />
    {/* Sin recortar el texto: una reseña cortada a la mitad no convence a nadie. */}
    <p className="text-navy/75 text-sm leading-relaxed whitespace-pre-line">{r.texto}</p>
  </article>
)

export default function ResenasGoogle() {
  const t = useT()
  const lang = useLang()
  const [datos, setDatos] = useState<Payload | null>(null)

  useEffect(() => {
    let vivo = true
    fetch('/api/resenas')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Payload | null) => { if (vivo && d) setDatos(d) })
      .catch(() => { /* la sección se queda con el botón; no es un error del usuario */ })
    return () => { vivo = false }
  }, [])

  // Google manda si contesta algo; si no, las escritas a mano.
  const deGoogle = datos?.reviews ?? []
  const reviews: Resena[] = deGoogle.length > 0
    ? deGoogle
    : [...RESENAS_GOOGLE]
        // La más reciente primero: es lo que espera quien lee reseñas, y el
        // archivo queda libre de tener que mantener el orden a mano.
        .sort((a, b) => b.fecha.localeCompare(a.fecha))
        .map((r) => ({
          autor: r.autor,
          foto: null,
          puntaje: r.puntaje,
          cuando: haceCuanto(r.fecha, lang),
          texto: r.texto[lang],
        }))

  const rating = datos?.rating ?? RESUMEN_GOOGLE.rating
  const total = datos?.total ?? RESUMEN_GOOGLE.total

  return (
    <RevealSection className="py-20 lg:py-28 bg-cream/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-prime text-base font-label uppercase tracking-[0.2em] font-extrabold mb-4 block">
            {t('resenas_kicker')}
          </span>
          <h2 className="text-navy font-headline text-3xl lg:text-4xl leading-tight">
            {t('resenas_titulo_1')} <span className="serif-italic text-blue-deep">{t('resenas_titulo_2')}</span>.
          </h2>

          {rating != null && (
            <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 border border-navy/10 shadow-sm">
              <span className="text-navy font-headline text-2xl leading-none">
                {rating.toFixed(1)}
              </span>
              <Estrellas puntaje={rating} size={18} />
              <span className="text-navy/60 text-sm">
                {total} {t('resenas_en_google')}
              </span>
            </div>
          )}
        </div>

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.slice(0, 6).map((r, i) => (
              <Tarjeta key={`${r.autor}-${i}`} r={r} />
            ))}
          </div>
        )}

        <div className="text-center">
          <p className="text-navy/70 text-lg mb-6">{t('resenas_cta_texto')}</p>
          <a
            href={ENLACE_RESENA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-coral text-white px-10 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-coral/90 transition-all shadow-lg shadow-coral/20"
          >
            {t('resenas_cta_btn')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </RevealSection>
  )
}
