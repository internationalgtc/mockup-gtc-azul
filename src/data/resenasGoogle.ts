/**
 * Las reseñas del perfil de Google de GTC, escritas a mano.
 *
 * POR QUÉ A MANO Y NO POR LA API
 * Traerlas de la Places API cuesta una cuenta de Google Cloud con facturación,
 * se paga por consulta y devuelve como mucho 5 — menos de las que hay. Con este
 * volumen no compensa. Cuando el perfil crezca, `/api/resenas` ya está escrito:
 * en cuanto exista `GOOGLE_PLACES_API_KEY` estas de acá se apagan solas y pasan
 * a salir de Google, sin tocar el componente.
 *
 * CÓMO SE ACTUALIZA
 * Panel de Google Business → «Leer opiniones». Se copian tal cual, sin editar el
 * texto de nadie. Las que no traen texto no se ponen: una tarjeta con estrellas
 * y nada escrito no le dice nada al que la lee.
 *
 * La fecha se guarda absoluta (aproximada al día que se publicó) y el «hace N
 * meses» lo calcula la pantalla: escribirlo a mano envejece mal.
 */

export type ResenaLocal = {
  autor: string
  puntaje: number
  /** ISO. Aproximada: Google solo muestra «hace N semanas». */
  fecha: string
  texto: { es: string; en: string }
}

export const RESENAS_GOOGLE: ResenaLocal[] = [
  {
    autor: 'Curro Sabán',
    puntaje: 5,
    fecha: '2025-10-03',
    texto: {
      es: 'Espectacular, esa es la palabra que define esta empresa profesional e innovadora. Ofrecen una manera de contratación de personas muy cualificadas, que difícil encuentra en otro lugar. Un 10! Gracias',
      en: 'Spectacular — that is the word for this professional, innovative company. They offer a way of hiring highly qualified people that is hard to find anywhere else. A 10! Thank you.',
    },
  },
  {
    autor: 'Karelis Rojas Contreras',
    puntaje: 5,
    fecha: '2025-11-07',
    texto: {
      es: 'Excelente, empresa altamente profesional y calificada. 100% confiable.',
      en: 'Excellent — a highly professional and qualified company. 100% trustworthy.',
    },
  },
  {
    autor: 'Sergio Varo',
    puntaje: 5,
    fecha: '2025-11-28',
    texto: {
      es: 'Llevamos confiando en Global Talent casi un año y todo genial. Están pendientes de todo y solucionan muchos problemas diarios de la empresa con las soluciones idóneas',
      en: 'We have been trusting Global Talent for almost a year and everything has been great. They stay on top of everything and solve many of the company’s daily problems with the right solutions.',
    },
  },
  {
    autor: 'Mario Dólera',
    puntaje: 5,
    fecha: '2025-11-28',
    texto: {
      es: 'Muy profesionales y me han encontrado el perfil que necesitaba. Totalmente recomendables si quieres incorporar talento a tu empresa',
      en: 'Very professional, and they found the profile I needed. Fully recommended if you want to bring talent into your company.',
    },
  },
  // Falta la de Ingrid De Cordido (5★, nov-2025): en el panel sale cortada
  // («Su enfoque… Ver la opinión completa») y no se publica media reseña.
]

/** Lo que muestra el perfil: 5,0 sobre 7 opiniones (4-sep-2026). */
export const RESUMEN_GOOGLE = { rating: 5.0, total: 7 }
