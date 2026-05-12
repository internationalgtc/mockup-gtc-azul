import { Link } from 'react-router-dom'
import { ArrowRight, Rocket, Users, Award, Lightbulb, Briefcase, Globe } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import { useT } from '@/hooks/useT'
import SEO from '@/components/shared/SEO'

const BENEFITS = [
  { icon: Rocket, tk: 'ben_1_t', dk: 'ben_1_d' },
  { icon: Globe, tk: 'ben_2_t', dk: 'ben_2_d' },
  { icon: Users, tk: 'ben_3_t', dk: 'ben_3_d' },
  { icon: Award, tk: 'ben_4_t', dk: 'ben_4_d' },
  { icon: Lightbulb, tk: 'ben_5_t', dk: 'ben_5_d' },
  { icon: Briefcase, tk: 'ben_6_t', dk: 'ben_6_d' },
]

const PROCESS = [
  { step: '01', tk: 'ben_proc_1_t', dk: 'ben_proc_1_d' },
  { step: '02', tk: 'ben_proc_2_t', dk: 'ben_proc_2_d' },
  { step: '03', tk: 'ben_proc_3_t', dk: 'ben_proc_3_d' },
]

export default function BeneficiosPage() {
  const t = useT()

  return (
    <>
      <SEO
        title="Beneficios"
        description="Las ventajas de trabajar con Global Talent Connections: profesionales seleccionados, gestión integral, ahorro de hasta 50%."
        path="/beneficios"
      />
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full -mr-48 -mt-24" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-light text-xs font-label uppercase tracking-widest font-bold mb-4 block">{t('beneficios_label')}</span>
            <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {t('beneficios_titulo_1')} <span className="text-gold">{t('beneficios_titulo_2')}</span> {t('beneficios_titulo_3')}
            </h1>
            <p className="text-white/60 text-lg mb-10 max-w-lg">
              {t('beneficios_subtitle')}
            </p>
            <Link
              to="/empleos"
              className="inline-flex items-center gap-3 bg-coral text-white px-10 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-coral/90 transition-all shadow-lg shadow-coral/20"
            >
              {t('beneficios_ver_vacantes')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Equipo remoto trabajando"
              className="w-full h-[450px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-coral">
              <div className="text-navy font-headline font-bold text-3xl">103+</div>
              <div className="text-dark-gray text-sm">{t('ben_activos')}</div>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="py-24 lg:py-32 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-prime text-xs font-label uppercase tracking-widest font-extrabold mb-6 block">{t('beneficios_seccion_label')}</span>
            <h2 className="text-navy font-headline font-bold text-4xl lg:text-5xl">{t('beneficios_seccion_titulo')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map(b => (
              <div key={t(b.tk)} className="bg-white p-8 lg:p-10 rounded-xl border border-border-soft hover:shadow-xl hover:border-blue-prime/20 transition-all group">
                <div className="w-14 h-14 rounded-full bg-blue-prime/10 flex items-center justify-center mb-6 group-hover:bg-blue-prime group-hover:scale-110 transition-all">
                  <b.icon className="w-6 h-6 text-blue-prime group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-navy font-headline font-bold text-xl mb-3">{t(b.tk)}</h3>
                <p className="text-dark-gray leading-relaxed">{t(b.dk)}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="py-24 lg:py-32 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-light text-xs font-label uppercase tracking-widest font-extrabold mb-6 block">Proceso</span>
            <h2 className="text-white font-headline font-bold text-4xl lg:text-5xl">3 pasos para empezar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS.map(p => (
              <div key={p.step} className="glass-card p-8 rounded-xl border border-white/10 text-center">
                <div className="text-coral font-headline font-bold text-4xl mb-4">{p.step}</div>
                <h3 className="text-white font-headline font-bold text-xl mb-3">{t(p.tk)}</h3>
                <p className="text-white/50 leading-relaxed">{t(p.dk)}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <section className="py-24 lg:py-32 bg-cream text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-navy font-headline font-bold text-4xl lg:text-5xl mb-6">
            {t('beneficios_cta_titulo')}
          </h2>
          <p className="text-dark-gray text-lg mb-10">
            {t('beneficios_cta_desc')}
          </p>
          <Link
            to="/empleos"
            className="inline-flex items-center gap-3 bg-coral text-white px-10 py-5 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-coral/90 transition-all shadow-lg shadow-coral/20"
          >
            {t('beneficios_cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
