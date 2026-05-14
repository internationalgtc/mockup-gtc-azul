import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trackLead } from '@/lib/tracking'

const LEADS_URL =
  import.meta.env.VITE_PLATFORM_API_URL ?? 'https://www.globaltalentconnections.online/api/leads/public'

interface ChatLeadCaptureProps {
  onCapture: (name: string, email: string) => void
  onSkip: () => void
}

export const ChatLeadCapture = ({ onCapture, onSkip }: ChatLeadCaptureProps) => {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !company.trim() || !name.trim()) return
    setSubmitted(true)

    const params = new URLSearchParams(window.location.search)
    const utm_source = params.get('utm_source') || undefined
    const utm_campaign = params.get('utm_campaign') || undefined
    const utm_content = params.get('utm_content') || undefined
    const gclid = params.get('gclid') || undefined
    const fbclid = params.get('fbclid') || undefined

    fetch(LEADS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: company.trim(),
        contact_name: name.trim(),
        contact_email: email.trim(),
        source: 'web_formulario',
        description: 'Lead capturado desde chatbot IA',
        utm_medium: 'chatbot',
        ...(utm_source && { utm_source }),
        ...(utm_campaign && { utm_campaign }),
        ...(utm_content && { utm_content }),
        ...(gclid && { gclid }),
        ...(fbclid && { fbclid }),
        referrer: window.location.href,
      }),
    }).catch(() => {})

    trackLead('chatbot_widget')
    onCapture(name.trim(), email.trim())
  }

  if (submitted) {
    return (
      <div className="text-sm font-body text-white bg-blue-prime/20 border border-blue-prime rounded-xl px-4 py-3 text-center">
        {isEN ? '✓ Got it! We\'ll be in touch shortly.' : '✓ ¡Perfecto! Te contactamos pronto.'}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-navy-soft rounded-xl p-4 space-y-3 border border-white/10"
    >
      <p className="text-xs font-label uppercase tracking-widest text-blue-light font-bold">
        {isEN ? 'Leave your details:' : 'Dejá tus datos:'}
      </p>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder={isEN ? 'Company name *' : 'Nombre de la empresa *'}
        required
        className="w-full text-sm font-body bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-prime"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={isEN ? 'Your name *' : 'Tu nombre *'}
        required
        className="w-full text-sm font-body bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-prime"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={isEN ? 'Your email *' : 'Tu email *'}
        required
        className="w-full text-sm font-body bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-prime"
      />
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 bg-coral text-white text-xs font-label uppercase tracking-widest font-bold rounded-lg py-2 hover:bg-coral/90 transition-colors"
        >
          {isEN ? 'Send' : 'Enviar'}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-label uppercase tracking-widest text-white/50 hover:text-white px-3 transition-colors"
        >
          {isEN ? 'Skip' : 'Omitir'}
        </button>
      </div>
    </form>
  )
}
