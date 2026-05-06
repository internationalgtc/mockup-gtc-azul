import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Code, Palette, Users, FileSpreadsheet, Headphones, Megaphone, BrainCircuit, Building2, Cog, ShoppingCart, type LucideIcon } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import { useT, useLang } from '@/hooks/useT'

interface Servicio {
  id: string
  icon: LucideIcon
  title: string
  desc: string
  image: string
  alt: string
}

function ServiceCard({ service, t }: { service: Servicio; t: (k: string) => string }) {
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
            {t('servicios_solicitar')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ServiciosPage() {
  const t = useT()
  const lang = useLang()

  const SERVICIOS: Servicio[] = [
    { id: 'admin', icon: Users, title: t('serv_admin'), desc: t('serv_admin_desc'), image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80', alt: lang === 'en' ? 'Professional team working in modern office' : 'Equipo profesional trabajando en oficina moderna' },
    { id: 'marketing', icon: Megaphone, title: t('serv_marketing'), desc: t('serv_marketing_desc'), image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', alt: lang === 'en' ? 'Analytics dashboard and digital marketing metrics' : 'Dashboard de analytics y métricas de marketing digital' },
    { id: 'finanzas', icon: FileSpreadsheet, title: lang === 'en' ? 'Financial / Accounting' : 'Financiero / Contable', desc: t('serv_finanzas_desc'), image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', alt: lang === 'en' ? 'Financial reports and calculator' : 'Reportes financieros y calculadora en escritorio profesional' },
    { id: 'webdev', icon: Code, title: lang === 'en' ? 'Web Development' : 'Desarrollo Web', desc: lang === 'en' ? 'Frontend, backend, web applications, API integrations and platform maintenance.' : 'Frontend, backend, aplicaciones web, integraciones API y mantenimiento de plataformas.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', alt: lang === 'en' ? 'Developer working with code on screen' : 'Desarrollador trabajando con código en pantalla' },
    { id: 'diseno', icon: Palette, title: t('serv_diseno'), desc: t('serv_diseno_desc'), image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', alt: lang === 'en' ? 'Design tools and color palette in creative workspace' : 'Herramientas de diseño y paleta de colores en workspace creativo' },
    { id: 'atencion', icon: Headphones, title: t('serv_atencion'), desc: t('serv_atencion_desc'), image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80', alt: lang === 'en' ? 'Professional with headset attending clients' : 'Profesional con headset atendiendo clientes' },
    { id: 'ia', icon: BrainCircuit, title: lang === 'en' ? 'Automation / AI' : 'Automatización / IA', desc: lang === 'en' ? 'Automated workflows, chatbots, AI data analysis and intelligent integrations.' : 'Workflows automatizados, chatbots, análisis de datos con IA e integraciones inteligentes.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80', alt: lang === 'en' ? 'AI and automation interface' : 'Interfaz de inteligencia artificial y automatización' },
    { id: 'arquitectura', icon: Building2, title: lang === 'en' ? 'Architecture' : 'Arquitectura', desc: lang === 'en' ? 'BIM modeling, technical drawings, 3D renders, budgets and project management.' : 'Modelado BIM, planos técnicos, renders 3D, presupuestos y gestión de proyectos.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', alt: lang === 'en' ? 'Architectural plans and building model' : 'Planos arquitectónicos y maqueta de edificio moderno' },
    { id: 'ecommerce', icon: ShoppingCart, title: t('serv_ecommerce'), desc: t('serv_ecommerce_desc'), image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', alt: lang === 'en' ? 'Online store management and product packaging' : 'Gestión de tienda online y empaquetado de productos' },
    { id: 'operativa', icon: BarChart3, title: lang === 'en' ? 'Operations Management' : 'Gestión Operativa', desc: lang === 'en' ? 'Process coordination, KPI tracking, executive reports and continuous improvement.' : 'Coordinación de procesos, seguimiento de KPIs, reportes ejecutivos y mejora continua.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', alt: lang === 'en' ? 'Dashboard with KPIs and performance charts' : 'Dashboard con KPIs y gráficos de rendimiento empresarial' },
    { id: 'tecnico', icon: Cog, title: t('serv_tecnico'), desc: t('serv_tecnico_desc'), image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', alt: lang === 'en' ? 'Server room and technology infrastructure' : 'Sala de servidores e infraestructura tecnológica' },
  ]

  return (
    <>
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-blue-light text-xs font-label uppercase tracking-widest font-bold mb-4 block">{t('servicios_label')}</span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t('servicios_titulo_1')} <span className="serif-italic text-gold">{t('servicios_titulo_2')}</span>.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {t('servicios_subtitle')}
          </p>
        </div>
      </section>

      <RevealSection className="py-20 lg:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIOS.map(s => (
              <ServiceCard key={s.id} service={s} t={t} />
            ))}
          </div>

          {/* CTA bottom */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-cream rounded-2xl p-10 lg:p-14 max-w-2xl">
              <h3 className="font-headline text-2xl lg:text-3xl text-navy mb-4">{t('servicios_no_encuentras')}</h3>
              <p className="text-dark-gray mb-8">{t('servicios_cuentanos')}</p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 bg-blue-prime text-white px-10 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-blue-deep transition-all shadow-lg shadow-blue-prime/20"
              >
                {t('servicios_solicitar_asistente')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  )
}
