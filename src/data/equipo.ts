import fotoDaniel from '@/assets/equipo/daniel.png'
import fotoAntonio from '@/assets/equipo/antonio.png'
import fotoPilar from '@/assets/equipo/mariangel.png'
import fotoAriel from '@/assets/equipo/ariel.png'
import fotoGladymar from '@/assets/equipo/gladymar.png'
import fotoAna from '@/assets/equipo/ana.png'
import fotoReyna from '@/assets/equipo/reyna.png'
import fotoFabiola from '@/assets/equipo/fabiola.png'
import fotoSuany from '@/assets/equipo/suany.png'
import fotoSebastian from '@/assets/equipo/sebastian.png'
import fotoLarisa from '@/assets/equipo/larisa.png'
import fotoDelfina from '@/assets/equipo/delfina.png'
import fotoNelson from '@/assets/equipo/nelson.png'
import fotoJavier from '@/assets/equipo/javier-2.png'
import fotoRocio from '@/assets/equipo/rocio.jpeg'

export interface TeamMember {
  id: number
  nombre: string
  foto: string | null
  rol: string
  rolEn: string
  email: string
  linkedin: string
  nivel: 'direccion' | 'lider' | 'operativo'
}

export const equipo: TeamMember[] = [
  // DIRECCION EJECUTIVA
  { id: 1, nombre: 'Daniel Crespo', foto: fotoDaniel, rol: 'CEO', rolEn: 'CEO', email: 'dcrespo@internationalgtc.com', linkedin: 'https://www.linkedin.com/in/daniel-crespo-garc%C3%ADa/', nivel: 'direccion' },

  // LIDERES
  { id: 3, nombre: 'Antonio Cabello', foto: fotoAntonio, rol: 'Head of Finance', rolEn: 'Head of Finance', email: 'acabello@internationalgtc.com', linkedin: 'https://www.linkedin.com/in/antonio-jesus-cabello-barea/', nivel: 'lider' },
  { id: 4, nombre: 'M. Pilar Marin', foto: fotoPilar, rol: 'HR & Commercial Lead', rolEn: 'HR & Commercial Lead', email: 'mmarin@internationalgtc.com', linkedin: 'https://www.linkedin.com/in/mariangel-pilar-marin-a786a8148/', nivel: 'lider' },
  { id: 5, nombre: 'Ariel Jimenez', foto: fotoAriel, rol: 'AI & Automation Lead', rolEn: 'AI & Automation Lead', email: 'ajimenez@internationalgtc.com', linkedin: '', nivel: 'lider' },
  { id: 6, nombre: 'Gladymar Torres', foto: fotoGladymar, rol: 'HR Business Partner', rolEn: 'HR Business Partner', email: 'gtorres@internationalgtc.com', linkedin: 'https://www.linkedin.com/in/gladymar-torres-825827188/', nivel: 'operativo' },
  { id: 7, nombre: 'Ana Martinez', foto: fotoAna, rol: 'Marketing & Sales Lead', rolEn: 'Marketing & Sales Lead', email: 'amartinez@internationalgtc.com', linkedin: '', nivel: 'lider' },

  // OPERATIVO
  { id: 8, nombre: 'Sebastián Acevedo', foto: fotoSebastian, rol: 'Quality & Ops Lead', rolEn: 'Quality & Ops Lead', email: 'sacevedo@internationalgtc.com', linkedin: '', nivel: 'lider' },
  { id: 9, nombre: 'Reyna Contreras', foto: fotoReyna, rol: 'HR Analyst', rolEn: 'HR Analyst', email: 'rcontreras@internationalgtc.com', linkedin: '', nivel: 'operativo' },
  { id: 10, nombre: 'Larisa Spatafora', foto: fotoLarisa, rol: 'Data & AI Analyst', rolEn: 'Data & AI Analyst', email: 'lspatafora@internationalgtc.com', linkedin: '', nivel: 'operativo' },
  { id: 11, nombre: 'Nelson Alonso', foto: fotoNelson, rol: 'AI & Automation', rolEn: 'AI & Automation', email: 'nalonso@internationalgtc.com', linkedin: '', nivel: 'operativo' },
  { id: 12, nombre: 'Javier Martinez', foto: fotoJavier, rol: 'IT Analyst', rolEn: 'IT Analyst', email: 'jmartinez@internationalgtc.com', linkedin: 'https://www.linkedin.com/in/javierjmc/', nivel: 'operativo' },
  { id: 13, nombre: 'Fabiola Lozano', foto: fotoFabiola, rol: 'Quality Analyst', rolEn: 'Quality Analyst', email: 'flozano@internationalgtc.com', linkedin: 'https://www.linkedin.com/in/fabiolalozano/', nivel: 'operativo' },
  { id: 15, nombre: 'Delfina Palacio', foto: fotoDelfina, rol: 'Community Manager', rolEn: 'Community Manager', email: 'dpalacio@internationalgtc.com', linkedin: '', nivel: 'operativo' },
  { id: 16, nombre: 'Suany Artica', foto: fotoSuany, rol: 'Quality Analyst', rolEn: 'Quality Analyst', email: 'sartica@internationalgtc.com', linkedin: '', nivel: 'operativo' },
  { id: 17, nombre: 'Rocío', foto: fotoRocio, rol: 'Quality Analyst', rolEn: 'Quality Analyst', email: 'rrojas@internationalgtc.com', linkedin: '', nivel: 'operativo' },
]

export const direccion = equipo.filter(m => m.nivel === 'direccion' || m.nivel === 'lider')
export const operativo = equipo.filter(m => m.nivel === 'operativo')
