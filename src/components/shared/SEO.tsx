import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: string
  faqSchema?: object
}

const BASE_URL = 'https://www.globaltalent-connections.com'
const DEFAULT_IMAGE = `${BASE_URL}/blog/futuro-talento-remoto-2026.png`

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Global Talent Connections',
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  description:
    'Conectamos empresas con profesionales remotos de alto rendimiento. Selección, gestión y supervisión integral.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: [
    'https://ve.linkedin.com/company/global-talent-connections-limited',
    'https://www.instagram.com/globaltalentconnections/',
    'https://www.facebook.com/people/Global-Talent-Connections/61570361473550/',
  ],
}

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Global Talent Connections',
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  description:
    'Conectamos empresas españolas con profesionales remotos de alto rendimiento en Latinoamérica.',
  telephone: '+34623257706',
  priceRange: '€€',
  areaServed: ['ES', 'AR', 'MX', 'CO', 'VE'],
  serviceType: 'Selección y gestión de talento remoto',
  sameAs: [
    'https://ve.linkedin.com/company/global-talent-connections-limited',
    'https://www.instagram.com/globaltalentconnections/',
    'https://www.facebook.com/people/Global-Talent-Connections/61570361473550/',
  ],
}

// FAQs para Home y Servicios — apuntan a featured snippets de búsquedas de talento remoto
export const HOME_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es Global Talent Connections?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Global Talent Connections es una empresa especializada en conectar empresas españolas y europeas con profesionales remotos de alto rendimiento de Latinoamérica. Nos encargamos de la selección, gestión y supervisión integral del talento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto se puede ahorrar contratando talento remoto con GTC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las empresas que trabajan con Global Talent Connections ahorran hasta un 50% en costes de personal comparado con contrataciones locales en España, manteniendo la misma calidad y rendimiento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo puedo tener a un profesional trabajando?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nuestro proceso de selección dura entre 5 y 10 días hábiles. Una vez seleccionado el candidato, el profesional puede incorporarse de forma inmediata.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué perfiles profesionales puedo contratar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ofrecemos profesionales remotos en administración, marketing digital, desarrollo web, diseño gráfico, finanzas, atención al cliente, inteligencia artificial y más de 10 especialidades.',
      },
    },
  ],
}

export const SERVICIOS_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué servicios ofrece Global Talent Connections?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ofrecemos selección y gestión de talento remoto en más de 10 especialidades: administración, marketing, finanzas, desarrollo web, diseño, atención al cliente, inteligencia artificial, arquitectura, e-commerce, gestión de proyectos y soporte técnico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona el proceso de selección de GTC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El proceso tiene 4 pasos: búsqueda del perfil ideal, evaluación técnica y cultural de candidatos, presentación de los mejores perfiles a la empresa, e incorporación con supervisión continua durante los primeros meses.',
      },
    },
    {
      '@type': 'Question',
      name: '¿GTC gestiona la relación con el profesional después de la contratación?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Global Talent Connections ofrece gestión y supervisión integral: seguimiento del desempeño, comunicación continua con el profesional y soporte para resolver cualquier incidencia.',
      },
    },
  ],
}

export default function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  faqSchema,
}: SEOProps) {
  const fullTitle = `${title} | Global Talent Connections`
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="es" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="Global Talent Connections" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(ORGANIZATION_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(LOCAL_BUSINESS_SCHEMA)}
      </script>
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  )
}
