import { useState, useEffect } from 'react'
import type { Job } from '@/data/jobs'

const NEXUS_API_URL = 'https://www.globaltalentconnections.online/api/public/vacantes'

// Mapeo de categorías Nexus a departamentos del sitio
const CATEGORY_MAP: Record<string, string> = {
  administracion: 'Administración',
  tecnologia: 'Tecnología',
  comercial: 'Comercial',
  marketing: 'Marketing',
  finanzas: 'Finanzas',
  calidad: 'Calidad',
  construccion: 'Construcción',
  operaciones: 'Operaciones',
  rrhh: 'RRHH',
  otro: 'Otro',
}

// Mapeo de remote_type a tipo de empleo
const TYPE_MAP: Record<string, string> = {
  remote: 'Jornada Completa (Remoto)',
  hybrid: 'Jornada Completa (Híbrido)',
  onsite: 'Jornada Completa (Presencial)',
  part_time: 'Tiempo Parcial',
}

interface NexusJob {
  id: string
  title: string
  description: string | null
  category: string | null
  remote_type: string | null
  location: string | null
  opened_at: string
}

// Transformar datos de Nexus al formato del sitio web
function transformNexusJob(nexusJob: NexusJob): Job {
  return {
    id: nexusJob.id,
    active: true,
    title: nexusJob.title,
    department: CATEGORY_MAP[nexusJob.category || 'otro'] || nexusJob.category || 'Otro',
    location: nexusJob.location || 'Remoto',
    type: TYPE_MAP[nexusJob.remote_type || 'remote'] || 'Jornada Completa',
    imageUrl: '/img-empleos/default.jpg', // Imagen por defecto
    description: nexusJob.description || '',
    responsibilities: [], // Nexus no devuelve esto
    requirements: [], // Nexus no devuelve esto
  }
}

export function useNexusJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(NEXUS_API_URL)
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron cargar las vacantes`)

        const data = await response.json()
        const transformedJobs = (data.data || []).map(transformNexusJob)

        setJobs(transformedJobs)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido'
        setError(message)
        console.error('Error fetching jobs from Nexus:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return { jobs, loading, error }
}
