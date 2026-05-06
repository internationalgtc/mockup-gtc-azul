import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Code, Palette, Users, FileSpreadsheet, Headphones, Megaphone, BrainCircuit, Building2, Cog, ShoppingCart, type LucideIcon } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import { useT } from '@/hooks/useT'

interface Servicio {
  icon: LucideIcon
  titleKey: string
  descKey: string
  image: string
  alt: string
  popular?: boolean
}

const SERVICIOS: Servicio[] = [
  {
    icon: Users,
    titleKey: 'serv_admin',
    descKey: 'serv_admin_desc',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
    alt: 'Equipo profesional trabajando en oficina moderna',
    popular: true,
  },
  {
    icon: Megaphone,
    titleKey: 'serv_marketing',
    descKey: 'serv_marketing_desc',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    alt: 'Dashboard de analytics y métricas de marketing digital',
    popular: true,
  },
  {
    icon: FileSpreadsheet,
    titleKey: 'serv_finanzas',
    descKey: 'serv_finanzas_desc',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    alt: 'Reportes financieros y calculadora en escritorio profesional',
    popular: true,
  },
  {
    icon: Code,
    titleKey: 'serv_dev',
    descKey: 'serv_dev_desc',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    alt: 'Desarrollador trabajando con código en pantalla',
  },
  {
    icon: Palette,
    titleKey: 'serv_diseno',
    descKey: 'serv_diseno_desc',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    alt: 'Herramientas de diseño y paleta de colores en workspace creativo',
  },
  {
    icon: Headphones,
    titleKey: 'serv_atencion',
    descKey: 'serv_atencion_desc',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
    alt: 'Profesional con headset atendiendo clientes',
  },
  {
    icon: BrainCircuit,
    titleKey: 'serv_ia',
    descKey: 'serv_ia_desc',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    alt: 'Interfaz de inteligencia artificial y automatización',
  },
  {
    icon: Building2,
    titleKey: 'serv_arq',
    descKey: 'serv_arq_desc',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    alt: 'Planos arquitectónicos y maqueta de edificio moderno',
  },
  {
    icon: ShoppingCart,
    titleKey: 'serv_ecommerce',
    descKey: 'serv_ecommerce_desc',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    alt: 'Gestión de tienda online y empaquetado de productos',
  },
  {
    icon: BarChart3,
    titleKey: 'serv_gestion',
    descKey: 'serv_gestion_desc',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    alt: 'Dashboard con KPIs y gráficos de rendimiento empresarial',
  },
  {
    icon: Cog,
    titleKey: 'serv_tecnico',
    descKey: 'serv_tecnico_desc',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    alt: 'Sala de servidores e infraestructura tecnológica',
  },
]

function ServiceCard({ service, t }: { service: Servicio; t: (key: string) => string }) {
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
        {service.popular && (
          <div className="absolute top-3 right-3">
            <span className="bg-coral text-white text-[9px] font-label font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
              {t('serv_popular')}
            </span>
          </div>
        )}
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
            {t(service.titleKey)}
          </h3>
          <p className="text-dark-gray text-sm leading-relaxed">
            {t(service.descKey)}
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

  return (
    <>
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-blue-light text-xs font-label uppercase tracking-widest font-bold mb-4 block">{t('servicios_label')}</span>
          <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t('servicios_titulo_1')} <span className="text-gold">{t('servicios_titulo_2')}</span>.
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
              <ServiceCard key={s.titleKey} service={s} t={t} />
            ))}
          </div>

          {/* CTA bottom */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-cream rounded-2xl p-10 lg:p-14 max-w-2xl">
              <h3 className="font-headline text-2xl lg:text-3xl text-navy mb-4">{t('servicios_no_encuentras')}</h3>
              <p className="text-dark-gray mb-8">{t('servicios_cuentanos')}</p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 bg-coral text-white px-10 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-coral/90 transition-all shadow-lg shadow-coral/20"
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
