import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import SEO from '@/components/shared/SEO'
import { useT } from '@/hooks/useT'

const API_URL = import.meta.env.VITE_PLATFORM_API_URL || 'https://www.globaltalentconnections.online/api/leads/public'

const ASSISTANT_TYPES = [
  'Administrativo',
  'Marketing Digital',
  'Financiero / Contable',
  'Desarrollo Web',
  'Diseno Grafico',
  'Atencion al Cliente',
  'RRHH / Reclutamiento',
  'Otro',
]

const formSchema = z.object({
  company_name: z.string().min(2, 'Required'),
  contact_name: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  company_size: z.string().optional(),
  assistant_type: z.string().min(1, 'Required'),
  description: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function ContactoPage() {
  const t = useT()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const params = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_content: params.get('utm_content') || undefined,
        gclid: params.get('gclid') || undefined,
        fbclid: params.get('fbclid') || undefined,
      }

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          ...utmData,
          source: 'web_form',
          landing_url: window.location.href,
        }),
      })

      if (!res.ok) throw new Error('Error')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Contacto"
        description="Solicitá tu asesoría gratuita. Te contactamos en menos de 24h para ayudarte a contratar talento remoto de alto rendimiento."
        path="/contacto"
      />
      {/* HERO */}
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full -mr-48 -mt-24" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-blue-light text-xs font-label uppercase tracking-widest font-bold mb-4 block">{t('contacto_page_label')}</span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t('contacto_page_titulo_1')} <span className="serif-italic text-gold">{t('contacto_page_titulo_2')}</span>.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {t('contacto_page_subtitle')}
          </p>
        </div>
      </section>

      {/* FORMULARIO */}
      <RevealSection className="py-20 lg:py-28 bg-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {status === 'success' ? (
            <div className="text-center py-20">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="font-headline text-3xl text-navy mb-4">{t('contacto_page_enviado')}</h2>
              <p className="text-dark-gray text-lg">{t('contacto_page_enviado_desc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-navy/70 font-bold mb-2">
                    {t('contacto_page_empresa')}
                  </label>
                  <input
                    {...register('company_name')}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-white text-navy placeholder:text-navy/40 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                    placeholder={t('ct_ph_empresa')}
                  />
                  {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
                </div>

                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-navy/70 font-bold mb-2">
                    {t('contacto_page_nombre')}
                  </label>
                  <input
                    {...register('contact_name')}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-white text-navy placeholder:text-navy/40 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                    placeholder={t('ct_ph_nombre')}
                  />
                  {errors.contact_name && <p className="text-red-500 text-xs mt-1">{errors.contact_name.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-navy/70 font-bold mb-2">
                    {t('contacto_email')}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-white text-navy placeholder:text-navy/40 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                    placeholder="email@empresa.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-navy/70 font-bold mb-2">
                    {t('contacto_telefono')}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-white text-navy placeholder:text-navy/40 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                    placeholder={t('ct_ph_telefono')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-navy/70 font-bold mb-2">
                    {t('contacto_page_tamano')}
                  </label>
                  <select
                    {...register('company_size')}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-white text-navy focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                  >
                    <option value="">{t('contacto_page_seleccionar')}</option>
                    <option value="1-10">{t('ct_emp_1')}</option>
                    <option value="11-50">{t('ct_emp_2')}</option>
                    <option value="51-200">{t('ct_emp_3')}</option>
                    <option value="201-500">{t('ct_emp_4')}</option>
                    <option value="500+">{t('ct_emp_5')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-navy/70 font-bold mb-2">
                    {t('contacto_page_tipo')}
                  </label>
                  <select
                    {...register('assistant_type')}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-white text-navy focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all"
                  >
                    <option value="">{t('contacto_page_seleccionar')}</option>
                    {ASSISTANT_TYPES.map(at => (
                      <option key={at} value={at}>{at}</option>
                    ))}
                  </select>
                  {errors.assistant_type && <p className="text-red-500 text-xs mt-1">{errors.assistant_type.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-navy/70 font-bold mb-2">
                  {t('contacto_page_mas')}
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border-soft bg-white text-navy placeholder:text-navy/40 focus:ring-2 focus:ring-blue-prime focus:border-blue-prime outline-none transition-all resize-none"
                  placeholder={t('ct_ph_desc')}
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 text-red-500 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{t('ct_error')}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-auto bg-blue-prime text-white px-10 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-blue-deep transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-prime/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {t('contacto_page_enviar')}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </RevealSection>
    </>
  )
}
