// Construye el structured data JobPosting (schema.org) de una vacante.
// Hace elegibles las páginas /empleos/[id] para el recuadro de Google Jobs.
// Docs: https://developers.google.com/search/docs/appearance/structured-data/job-posting

const BASE_URL = 'https://www.globaltalent-connections.com'

// Países de LATAM desde donde se puede postular (audiencia real del sitio según GA4).
const LATAM_COUNTRIES = [
  'Argentina', 'Chile', 'Colombia', 'Venezuela', 'Perú', 'Ecuador', 'México',
  'Uruguay', 'Bolivia', 'Paraguay', 'Guatemala', 'Costa Rica', 'Panamá',
  'República Dominicana', 'Honduras', 'El Salvador', 'Nicaragua',
]

// Google exige una fecha de publicación. Es única para todas por ahora — refrescar
// periódicamente para que las vacantes no figuren "viejas" en Google Jobs.
const DATE_POSTED = '2026-06-01'
const VALID_THROUGH = '2026-08-31'

function employmentType(type: string): string {
  const t = (type || '').toLowerCase()
  if (t.includes('parcial') || t.includes('part')) return 'PART_TIME'
  if (t.includes('pasant') || t.includes('intern') || t.includes('práctic')) return 'INTERN'
  return 'FULL_TIME'
}

export interface JobForSchema {
  id: string
  title: string
  description: string
  type: string
  requirements?: string[]
  imageUrl?: string
}

export function buildJobPostingSchema(job: JobForSchema) {
  const requirementsHtml = job.requirements?.length
    ? `<p><strong>Requisitos:</strong></p><ul>${job.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>`
    : ''
  const descriptionHtml = `<p>${job.description}</p>${requirementsHtml}`

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: descriptionHtml,
    datePosted: DATE_POSTED,
    validThrough: VALID_THROUGH,
    employmentType: employmentType(job.type),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Global Talent Connections',
      sameAs: BASE_URL,
      logo: `${BASE_URL}/og-image.png`,
    },
    // Trabajo 100% remoto: se marca como teletrabajo + países donde se puede postular.
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: LATAM_COUNTRIES.map((name) => ({
      '@type': 'Country',
      name,
    })),
    identifier: {
      '@type': 'PropertyValue',
      name: 'Global Talent Connections',
      value: job.id,
    },
    url: `${BASE_URL}/empleos/${job.id}`,
    ...(job.imageUrl ? { image: `${BASE_URL}${job.imageUrl}` } : {}),
  }
}
