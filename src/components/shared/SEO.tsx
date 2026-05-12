import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: string
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

export default function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
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
    </Helmet>
  )
}
