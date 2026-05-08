import { useState, useEffect, useRef, FC } from 'react'
import { Maximize2, ArrowLeft, Quote, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RevealSection } from '@/components/shared/RevealSection'
import { useT } from '@/hooks/useT'

interface Testimonio {
  nombre: string
  cargo: string
  texto: string
  video: string
  thumbnail: string
}

const CLD = 'https://res.cloudinary.com/dax2r7ro2'
const v = (id: string) => `${CLD}/video/upload/${id}.webm`
const t = (id: string) => `${CLD}/image/upload/${id}.jpg`

const TESTIMONIOS: Testimonio[] = [
  {
    nombre: 'Miguel Ángel Ramírez',
    cargo: 'CEO en Construcciones Ramírez',
    texto: 'Me brindaron acompañamiento continuo y se adaptaron a mis necesidades. Como empresarios, los asistentes virtuales nos proporcionan una gran ventaja.',
    video: v('testimonio-1_w9vvjk'),
    thumbnail: t('t1_h390b4'),
  },
  {
    nombre: 'Arturo Sanz Santos',
    cargo: 'CEO en Areacad Ingeniería Audiovisual',
    texto: 'Este modelo nos abrió la posibilidad de contar con más recursos humanos por un costo inferior. El personal es excepcional.',
    video: v('testimonio-2_lfxbdt'),
    thumbnail: t('t2_m1jyo3'),
  },
  {
    nombre: 'Alex Andreu Peinado',
    cargo: 'CEO en PMV Factory',
    texto: 'Los asistentes virtuales se adaptaron desde el primer momento, mostrando gran compromiso y profesionalismo.',
    video: v('testimonio-3_xydej8'),
    thumbnail: t('t3_hvejtp'),
  },
  {
    nombre: 'Curro Sabás',
    cargo: 'CEO en Coseba, Seguros Paco Saban',
    texto: 'Estamos muy satisfechos con la calidad de los asistentes y la facilidad de contratación que ofrece Global Talent Connections.',
    video: v('testimonio-4_u393rn'),
    thumbnail: t('t4_gsihfc'),
  },
]

const VideoModal: FC<{ testimonio: Testimonio | null; cerrar: () => void }> = ({ testimonio, cerrar }) => {
  useEffect(() => {
    if (!testimonio) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') cerrar() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKey)
    }
  }, [testimonio, cerrar])

  if (!testimonio) return null

  return (
    <div className="fixed inset-0 bg-navy/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={cerrar}
          className="flex items-center gap-2 bg-white text-navy px-5 py-2.5 rounded-lg font-label font-bold text-sm uppercase tracking-widest hover:bg-blue-prime hover:text-white transition-all duration-200 shadow-lg"
        >
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>
      <div className="relative bg-navy-soft rounded-2xl p-4 max-w-4xl w-full border border-blue-prime/30 shadow-2xl">
        <div className="aspect-video w-full rounded-xl overflow-hidden">
          <video src={testimonio.video} controls autoPlay className="w-full h-full bg-navy" />
        </div>
        <div className="mt-4 px-2">
          <p className="text-off-white font-headline text-lg">{testimonio.nombre}</p>
          <p className="text-blue-light text-xs font-label uppercase tracking-widest">{testimonio.cargo}</p>
        </div>
      </div>
    </div>
  )
}

const TestimonioCard: FC<{ testimonio: Testimonio; abrirModal: (t: Testimonio) => void }> = ({ testimonio, abrirModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="bg-white rounded-xl border border-border-soft hover:border-blue-prime/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative w-full aspect-video bg-navy group">
        <video
          ref={videoRef}
          src={testimonio.video}
          poster={testimonio.thumbnail}
          controls
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => abrirModal(testimonio)}
          className="absolute top-2 right-2 bg-navy/70 hover:bg-blue-prime text-white rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
          title="Ver en pantalla completa"
          aria-label={`Expandir testimonio de ${testimonio.nombre}`}
        >
          <Maximize2 size={16} />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Quote size={18} className="text-blue-prime mb-2" />
        <p className="text-dark-gray font-light leading-relaxed text-sm flex-1">
          "{testimonio.texto}"
        </p>
        <div className="mt-4 pt-4 border-t border-border-soft">
          <p className="font-headline text-navy font-bold">{testimonio.nombre}</p>
          <p className="text-blue-prime text-xs font-label uppercase tracking-widest mt-0.5">{testimonio.cargo}</p>
        </div>
      </div>
    </div>
  )
}

const ESCRITOS = [
  {
    name: 'Carlos Martínez',
    role: 'CEO, Taktics Ingeniería',
    quote: 'Contratamos dos asistentes y en 3 meses redujimos costos operativos un 60%. El seguimiento que hacen es impecable.',
    initials: 'CM',
  },
  {
    name: 'Laura Pérez',
    role: 'Directora, Paneles Acústicos Eco Cero',
    quote: 'Tenemos 7 asistentes con GTC. La calidad del talento y la supervisión constante hacen la diferencia.',
    initials: 'LP',
  },
  {
    name: 'Miguel Rodríguez',
    role: 'Fundador, Nogomet Comunicación',
    quote: 'Pasamos de buscar freelancers a tener un equipo estable y gestionado. Nos cambió la operación.',
    initials: 'MR',
  },
]

const Testimonials: FC = () => {
  const t = useT()
  const [testimonioAbierto, setTestimonioAbierto] = useState<Testimonio | null>(null)

  return (
    <RevealSection className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-prime/5 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-prime text-base font-label uppercase tracking-[0.2em] font-extrabold mb-4 block">
            Casos de éxito
          </span>
          <h2 className="text-navy font-headline text-4xl lg:text-5xl leading-tight">
            Lo que dicen <span className="serif-italic text-blue-deep">nuestros clientes</span>.
          </h2>
        </div>

        {/* Testimonios en video */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIOS.map((tm, i) => (
            <TestimonioCard key={i} testimonio={tm} abrirModal={setTestimonioAbierto} />
          ))}
        </div>

        {/* Opiniones escritas */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {ESCRITOS.map((tm) => (
            <div key={tm.name} className="bg-white p-10 lg:p-12 rounded-2xl border border-border-soft hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
              <div className="text-coral/20 font-headline text-8xl leading-none absolute top-6 right-8">"</div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-navy/80 text-lg leading-relaxed mb-8">{tm.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-white font-headline font-bold text-sm">
                    {tm.initials}
                  </div>
                  <div>
                    <div className="font-headline font-bold text-navy">{tm.name}</div>
                    <div className="text-dark-gray text-sm">{tm.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-navy/70 text-lg mb-6">{t('testimonios_cta')}</p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 bg-coral text-white px-10 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-coral/90 transition-all shadow-lg shadow-coral/20"
          >
            {t('testimonios_cta_btn')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <VideoModal testimonio={testimonioAbierto} cerrar={() => setTestimonioAbierto(null)} />
    </RevealSection>
  )
}

export default Testimonials
