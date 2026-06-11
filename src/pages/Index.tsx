import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trackLead } from '@/lib/tracking'
import { getUTMs, getLandingUrl } from '@/lib/utm'
import { getCountry } from '@/lib/geo'
import { ArrowRight, Zap, Brain, Handshake, Search, Users, FileCheck, Headphones, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import { useT } from '@/hooks/useT'
import Testimonials from '@/components/Testimonials'
import SEO, { HOME_FAQ_SCHEMA } from '@/components/shared/SEO'

import l1 from '@/assets/logos/l1.png'
import l2 from '@/assets/logos/l2.jpg'
import l3 from '@/assets/logos/l3.webp'
import l4 from '@/assets/logos/l4.webp'
import l5 from '@/assets/logos/l5.png'
import l6 from '@/assets/logos/l6.png'
import l7 from '@/assets/logos/l7.png'

const CLIENT_LOGOS = [
  { src: l1, alt: 'Reformas Habikal' },
  { src: l2, alt: 'Fricopan' },
  { src: l3, alt: 'Moonlight' },
  { src: l4, alt: 'Coseba Seguros' },
  { src: l5, alt: 'PMV Factory' },
  { src: l6, alt: 'Areacad' },
  { src: l7, alt: 'Gabinete Studios' },
]

const STAT_KEYS = [
  { value: '52', key: 'stat_empresas', color: 'text-blue-prime' },
  { value: '93', key: 'stat_profesionales', color: 'text-blue-prime' },
  { value: '50%', key: 'stat_ahorro', color: 'text-gold' },
  { value: '95%', key: 'stat_retencion', color: 'text-gold' },
]

const PROCESS_ICONS = [Search, Users, FileCheck, Headphones]
const PROCESS_STEPS_META = ['01', '02', '03', '04']

const ADVANTAGE_ICONS = [Zap, Brain, Handshake]
const ADVANTAGE_KEYS = [
  { titleKey: 'ventaja_1_titulo', descKey: 'ventaja_1_desc' },
  { titleKey: 'ventaja_2_titulo', descKey: 'ventaja_2_desc' },
  { titleKey: 'ventaja_3_titulo', descKey: 'ventaja_3_desc' },
]

export default function HomePage() {
  const t = useT()

  return (
    <>
      <SEO
        title="Home"
        description="Ahorrá hasta un 52% contratando talento remoto de alto rendimiento. Conectamos PYMEs en España con Asistentes Virtuales, SDRs y perfiles administrativos top. Selección, gestión y supervisión integral."
        path="/"
        faqSchema={HOME_FAQ_SCHEMA}
        keywords="asistentes virtuales España, talento remoto para empresas, contratar asistente virtual barato, trabajo remoto en euros, outsourcing LATAM, profesionales remotos España, reducir costes de personal, SDR remoto, Global Talent Connections"
      />
      {/* HERO */}
      <section className="relative bg-navy min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-prime/[0.08] blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-deep/10 blur-[100px] rounded-full -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-blue-prime/10 border border-blue-prime/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-light text-xs font-label uppercase tracking-widest font-bold">{t('hero_badge')}</span>
            </div>
            <h1 className="text-off-white font-headline text-4xl sm:text-5xl md:text-7xl leading-[1.1] mb-6 font-bold">
              <span className="text-coral">{t('hero_title_1')}</span>{' '}
              {t('hero_title_2')}
            </h1>
            <p className="text-white/60 text-lg md:text-xl mb-8 max-w-xl font-light">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contacto"
                className="bg-coral text-white px-8 py-5 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-coral/90 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-coral/20"
              >
                {t('hero_cta_empresa')}
              </Link>
              <Link
                to="/empleos"
                className="border border-gold text-gold px-8 py-5 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300 flex items-center justify-center gap-3"
              >
                {t('hero_cta_profesional')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block" />
        </div>

        {/* Hero image — full bleed right, covers entire section height */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <img
            alt="Remote team on video call"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative z-20 -mt-12 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-xl py-10 lg:py-12 px-8 lg:px-12 shadow-2xl border border-border-soft">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STAT_KEYS.map((stat, i) => (
              <div key={stat.key} className={`text-center ${i > 0 ? 'md:border-l md:border-border-soft' : ''}`}>
                <div className={`${stat.color} text-3xl lg:text-4xl font-headline font-bold mb-1`}>{stat.value}</div>
                <div className="text-navy/70 text-[10px] font-label uppercase tracking-widest font-extrabold">{t(stat.key)}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 pt-4 border-t border-border-soft">
            <span className="text-navy/40 text-[9px] font-label uppercase tracking-widest">{t('stat_micro')}</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <Testimonials />

      {/* LOGO TICKER */}
      <section className="py-16 lg:py-20 bg-off-white overflow-hidden" aria-label="Clientes">
        <div className="text-center mb-10">
          <span className="text-navy/70 text-xs font-label uppercase tracking-[0.3em]">{t('logos_titulo')}</span>
        </div>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-16 lg:gap-24 whitespace-nowrap animate-marquee">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-10 lg:h-14 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CULTURA */}
      <RevealSection className="py-24 lg:py-32 bg-cream overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-prime/5 blur-[100px] rounded-full -ml-48 -mb-48" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl blue-overlay">
              <img
                alt="Equipo trabajando en remoto"
                className="w-full h-[400px] lg:h-[600px] object-cover"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                loading="lazy"
              />
            </div>
            <div className="absolute top-8 lg:top-12 -right-4 lg:-right-12 bg-white p-6 lg:p-8 shadow-xl rounded-xl max-w-xs border-l-4 border-blue-prime">
              <p className="font-headline text-base lg:text-lg text-navy italic mb-4">
                {t('cultura_quote')}
              </p>
              <div className="font-label text-xs uppercase tracking-widest font-extrabold text-blue-deep">Global Talent Connections</div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-blue-prime text-xs font-label uppercase tracking-widest font-extrabold mb-6 block">{t('cultura_label')}</span>
            <h2 className="text-navy font-headline text-4xl md:text-5xl lg:text-6xl leading-tight mb-10">
              {t('cultura_titulo_1')} <span className="text-blue-prime">{t('cultura_titulo_2')}</span>.
            </h2>
            <div className="space-y-6 text-navy/80 font-light leading-relaxed text-lg">
              <p>{t('cultura_p1')}</p>
              <p>{t('cultura_p2')}</p>
            </div>
            <div className="mt-12">
              <Link to="/nosotros" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-navy flex items-center justify-center group-hover:bg-blue-prime group-hover:border-blue-prime group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span className="font-label text-sm uppercase tracking-widest font-extrabold text-navy group-hover:text-blue-prime transition-colors">
                  {t('cultura_cta')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* VENTAJAS */}
      <RevealSection className="py-24 lg:py-32 bg-off-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-prime/5 blur-[150px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-16 lg:mb-20">
            <span className="text-blue-prime text-xs font-label uppercase tracking-widest font-extrabold mb-6 block">{t('ventajas_label')}</span>
            <h2 className="text-navy font-headline text-4xl lg:text-5xl leading-tight">{t('ventajas_titulo')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADVANTAGE_KEYS.map((adv, i) => {
              const Icon = ADVANTAGE_ICONS[i]
              const anchors = ['<5%', '15d', '€0']
              return (
                <div
                  key={adv.titleKey}
                  className="bg-white p-8 lg:p-10 rounded-xl border border-border-soft hover:shadow-xl hover:border-blue-prime/20 transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-full bg-blue-prime/10 flex items-center justify-center group-hover:bg-blue-prime group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6 text-blue-prime group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-coral font-headline font-bold text-2xl">{anchors[i]}</span>
                  </div>
                  <h3 className="text-navy font-headline font-bold text-2xl mb-4">{t(adv.titleKey)}</h3>
                  <p className="text-dark-gray font-light leading-relaxed">{t(adv.descKey)}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <a href="#proceso" className="inline-flex items-center gap-3 text-blue-prime font-label font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
              {t('ventajas_cta')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </RevealSection>

      {/* PROCESO */}
      <ProcessSection t={t} />

      {/* CONTACTO INLINE */}
      <ContactSection />
    </>
  )
}

function ContactSection() {
  const t = useT()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ company_name: '', contact_name: '', contact_email: '', contact_phone: '', description: '' })

  const API_URL = 'https://www.globaltalentconnections.online/api/leads/public'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.company_name || !form.contact_name || !form.contact_email) return
    setStatus('loading')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'mockup_web',
          ...getUTMs(),
          country: getCountry(),
          landing_url: getLandingUrl(),
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      trackLead('home_form')
      setForm({ company_name: '', contact_name: '', contact_email: '', contact_phone: '', description: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <span className="text-blue-light text-xs font-label uppercase tracking-widest font-extrabold mb-6 block">{t('contacto_label')}</span>
          <h2 className="text-white font-headline font-bold text-4xl lg:text-5xl leading-tight mb-6">
            {t('contacto_titulo_1')} <span className="text-gold">{t('contacto_titulo_2')}</span>.
          </h2>
          <p className="text-white/60 text-lg mb-10">
            {t('contacto_subtitle')}
          </p>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span className="text-white/80">{t('contacto_respuesta')}</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span className="text-white/80">{t('contacto_candidatos')}</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span className="text-white/80">{t('contacto_reemplazo')}</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 lg:p-10 rounded-xl border border-white/10">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="font-headline font-bold text-2xl text-white mb-3">{t('contacto_enviado_titulo')}</h3>
              <p className="text-white/60">{t('contacto_enviado_desc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  value={form.company_name}
                  onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))}
                  placeholder={t('contacto_empresa')}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                />
                <input
                  value={form.contact_name}
                  onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))}
                  placeholder={t('contacto_nombre')}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  value={form.contact_email}
                  onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
                  type="email"
                  placeholder={t('contacto_email')}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                />
                <input
                  value={form.contact_phone}
                  onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))}
                  type="tel"
                  placeholder={t('contacto_telefono')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                />
              </div>
              <select
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all duration-300"
              >
                <option value="" disabled className="text-navy">{t('contacto_perfil')}</option>
                <option value="Administrativo" className="text-navy">{t('serv_admin')}</option>
                <option value="Marketing Digital" className="text-navy">{t('serv_marketing')}</option>
                <option value="Financiero / Contable" className="text-navy">{t('serv_finanzas')}</option>
                <option value="Desarrollo Web" className="text-navy">{t('serv_dev')}</option>
                <option value="Diseno Grafico" className="text-navy">{t('serv_diseno')}</option>
                <option value="Atencion al Cliente" className="text-navy">{t('serv_atencion')}</option>
                <option value="RRHH / Reclutamiento" className="text-navy">{t('contacto_perfil_admin')}</option>
                <option value="Otro" className="text-navy">{t('contacto_perfil_otro')}</option>
              </select>
              {status === 'error' && (
                <div className="flex items-center gap-3 text-red-400 bg-red-500/10 p-3 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {t('contacto_error')}
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-coral text-white py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-coral/90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-coral/20 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {t('contacto_cta')}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

const PROCESS_IMAGES = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
]

function ProcessSection({ t }: { t: (key: string) => string }) {
  const [active, setActive] = useState(0)

  return (
    <RevealSection id="proceso" className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Imagen interactiva */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={PROCESS_IMAGES[active]}
              alt={`Paso ${active + 1}`}
              className="w-full h-[300px] lg:h-[600px] object-cover transition-all duration-500"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-coral rounded-xl p-6 shadow-2xl">
            <div className="text-white font-headline font-bold text-3xl">15</div>
            <div className="text-white/80 text-xs font-label uppercase tracking-widest">{t('proceso_dias')}</div>
          </div>
        </div>

        {/* Pasos clickeables */}
        <div>
          <span className="text-blue-light text-xs font-label uppercase tracking-widest font-extrabold mb-6 block">{t('proceso_label')}</span>
          <h2 className="text-white font-headline font-bold text-4xl lg:text-5xl leading-tight mb-12">
            {t('proceso_titulo')}
          </h2>

          <div className="space-y-4">
            {PROCESS_STEPS_META.map((step, i) => {
              const Icon = PROCESS_ICONS[i]
              const n = i + 1
              const isActive = active === i
              return (
                <button
                  key={step}
                  onClick={() => setActive(i)}
                  className={`w-full flex gap-6 items-start text-left p-5 rounded-xl transition-all ${
                    isActive ? 'glass-card border border-coral/30' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-coral/20 border border-coral/30' : 'bg-white/5'
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-coral' : 'text-white/40'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-headline font-bold text-sm ${isActive ? 'text-coral' : 'text-white/20'}`}>{step}</span>
                      <h3 className={`font-headline font-bold text-lg ${isActive ? 'text-white' : 'text-white/60'}`}>{t(`proceso_${n}_titulo`)}</h3>
                    </div>
                    {isActive && (
                      <p className="text-white/50 leading-relaxed text-sm mt-1">{t(`proceso_${n}_desc`)}</p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
