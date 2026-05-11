import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useT } from '@/hooks/useT'

export default function NotFoundPage() {
  const t = useT()
  return (
    <section className="min-h-screen flex items-center justify-center bg-navy relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
      <div className="text-center relative z-10 px-6">
        <div className="text-8xl md:text-9xl font-headline text-gold mb-8">404</div>
        <h1 className="font-headline text-3xl md:text-4xl text-white mb-4">{t('not_found_titulo')}</h1>
        <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
          {t('not_found_desc')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-blue-prime text-white px-8 py-4 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-blue-deep transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('not_found_cta')}
        </Link>
      </div>
    </section>
  )
}
