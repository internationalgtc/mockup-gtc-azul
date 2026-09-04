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
 * texto de nadie. Las que puntuaron sin escribir van igual, con la tarjeta corta
 * (nombre, estrellas y cuándo): inventarles una frase seria falsificar una
 * reseña.
 *
 * La fecha se guarda absoluta (aproximada al día que se publicó) y el «hace N
 * meses» lo calcula la pantalla: escribirlo a mano envejece mal.
 */

export type ResenaLocal = {
  autor: string
  puntaje: number
  /** ISO. Aproximada: Google solo muestra «hace N semanas». */
  fecha: string
  /** `null` = puntuó sin escribir. La tarjeta se muestra igual, más corta: no
   *  se le pone texto en la boca a nadie. */
  texto: { es: string; en: string } | null
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
  {
    autor: 'Ingrid De Cordido',
    puntaje: 5,
    fecha: '2025-11-14',
    texto: {
      es: 'Global Talent Connections es más que un proveedor de servicios; es un socio clave para el crecimiento mutuo. Su enfoque en el desarrollo productivo del equipo remoto para empresas apunta a la constante evolución de la gestión de trabajo en tiempo de IA. Entienden que el éxito requiere equipos motivados y en constante aprendizaje. Una experiencia altamente satisfactoria y recomendada para líderes empresariales que miran hacia la innovación y para todo profesional que se enfoca en el crecimiento constante en proyectos gestionados en remoto.',
      en: 'Global Talent Connections is more than a service provider; it is a key partner for mutual growth. Their focus on the productive development of remote teams for companies is aimed at the constant evolution of work management in the age of AI. They understand that success requires motivated teams that keep learning. A highly satisfying experience, recommended for business leaders looking towards innovation and for any professional focused on constant growth in remotely managed projects.',
    },
  },
  {
    autor: 'Carlos',
    puntaje: 5,
    fecha: '2025-10-03',
    texto: null, // puntuó sin escribir
  },
]

/** Lo que muestra el perfil: 5,0 sobre 7 opiniones (4-sep-2026). */
export const RESUMEN_GOOGLE = { rating: 5.0, total: 7 }
