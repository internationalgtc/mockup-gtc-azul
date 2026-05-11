import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Code, Palette, Users, FileSpreadsheet, Headphones, Megaphone, BrainCircuit, Building2, Cog, ShoppingCart, type LucideIcon } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import SEO from '@/components/shared/SEO'

interface Servicio {
  icon: LucideIcon
  title: string
  desc: string
  image: string
  alt: string
}

const SERVICIOS: Servicio[] = [
  {
    icon: Users,
    title: 'Administrativo',
    desc: 'Gestión de agenda, correos, documentos, coordinación de equipos y soporte ejecutivo.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
    alt: 'Equipo profesional trabajando en oficina moderna',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    desc: 'Redes sociales, campañas publicitarias, email marketing, SEO y generación de contenido.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    alt: 'Dashboard de analytics y métricas de marketing digital',
  },
  {
    icon: FileSpreadsheet,
    title: 'Financiero / Contable',
    desc: 'Facturación, control de gastos, conciliación bancaria, reportes financieros y nóminas.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    alt: 'Reportes financieros y calculadora en escritorio profesional',
  },
  {
    icon: Code,
    title: 'Desarrollo Web',
    desc: 'Frontend, backend, aplicaciones web, integraciones API y mantenimiento de plataformas.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    alt: 'Desarrollador trabajando con código en pantalla',
  },
  {
    icon: Palette,
    title: 'Diseño Gráfico',
    desc: 'Identidad visual, piezas gráficas, presentaciones, edición de video y motion graphics.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    alt: 'Herramientas de diseño y paleta de colores en workspace creativo',
  },
  {
    icon: Headphones,
    title: 'Atención al Cliente',
    desc: 'Soporte multicanal, gestión de tickets, onboarding de clientes y seguimiento post-venta.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
    alt: 'Profesional con headset atendiendo clientes',
  },
  {
    icon: BrainCircuit,
    title: 'Automatización / IA',
    desc: 'Workflows automatizados, chatbots, análisis de datos con IA e integraciones inteligentes.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    alt: 'Interfaz de inteligencia artificial y automatización',
  },
  {
    icon: Building2,
    title: 'Arquitectura',
    desc: 'Modelado BIM, planos técnicos, renders 3D, presupuestos y gestión de proyectos.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    alt: 'Planos arquitectónicos y maqueta de edificio moderno',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce / Ventas',
    desc: 'Gestión de tiendas online, catálogo de productos, atención a compradores y logística.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    alt: 'Gestión de tienda online y empaquetado de productos',
  },
  {
    icon: BarChart3,
    title: 'Gestión Operativa',
    desc: 'Coordinación de procesos, seguimiento de KPIs, reportes ejecutivos y mejora continua.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    alt: 'Dashboard con KPIs y gráficos de rendimiento empresarial',
  },
  {
    icon: Cog,
    title: 'Técnico Especializado',
    desc: 'Soporte IT, administración de sistemas, bases de datos y seguridad informática.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    alt: 'Sala de servidores e infraestructura tecnológica',
  },
]

function ServiceCard({ service }: { service: Servicio }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border-soft bg-white hover:shadow-2xl hover:border-blue-prime/30 transition-all duration-300">
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={service.image}
          alt={service.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute bottom-3 left-3">
          <div className="w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <service.icon className="w-4.5 h-4.5 text-blue-prime" />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 lg:p-7 flex flex-col justify-between">
        <div>
          <h3 className="text-navy font-headline text-xl lg:text-2xl mb-3 group-hover:text-blue-prime transition-colors">
            {service.title}
          </h3>
          <p className="text-dark-gray text-sm leading-relaxed">
            {service.desc}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-border-soft/50">
          <Link
            to="/contacto"
            className="text-blue-prime text-xs font-label uppercase tracking-widest font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            Solicitar este perfil
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ServiciosPage() {
  return (
    <>
      <SEO
        title="Servicios"
        description="Asistentes virtuales y profesionales remotos para marketing, administración, diseño, desarrollo, ventas, RRHH y más. Un perfil para cada necesidad."
        path="/servicios"
      />
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-blue-light text-xs font-label uppercase tracking-widest font-bold mb-4 block">Nuestros Servicios</span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Un profesional para cada <span className="serif-italic text-gold">necesidad</span>.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Seleccionamos, capacitamos y gestionamos asistentes virtuales especializados en más de 11 áreas profesionales.
          </p>
        </div>
      </section>

      <RevealSection className="py-20 lg:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIOS.map(s => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>

          {/* CTA bottom */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-cream rounded-2xl p-10 lg:p-14 max-w-2xl">
              <h3 className="font-headline text-2xl lg:text-3xl text-navy mb-4">¿No encuentras el perfil que buscas?</h3>
              <p className="text-dark-gray mb-8">Cuéntanos qué necesitas y te presentamos candidatos en menos de 48 horas.</p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 bg-blue-prime text-white px-10 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-blue-deep transition-all shadow-lg shadow-blue-prime/20"
              >
                Solicitar asistente
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  )
}
