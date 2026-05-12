import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import logoWhite from '@/assets/logos/LogoLetrasBlancas.png'
import { useT } from '@/hooks/useT'

export function Footer() {
  const t = useT()
  return (
    <footer className="bg-navy-soft border-t border-blue-prime/20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 py-20">
        <div className="space-y-6">
          <img src={logoWhite} alt="Global Talent Connections" className="h-10 w-auto object-contain" loading="lazy" />
          <p className="text-white/70 text-sm font-light leading-relaxed">
            {t('footer_desc')}
          </p>
        </div>

        <div>
          <h5 className="text-white/60 font-label text-[10px] uppercase tracking-[0.2em] font-extrabold mb-6">{t('footer_empresa')}</h5>
          <ul className="space-y-3">
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/nosotros">{t('footer_sobre')}</Link></li>
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/servicios">{t('servicios_label')}</Link></li>
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/empleos">{t('empleos_label')}</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white/60 font-label text-[10px] uppercase tracking-[0.2em] font-extrabold mb-6">{t('footer_recursos')}</h5>
          <ul className="space-y-3">
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/blog">{t('blog_label')}</Link></li>
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/calculadora-ahorro">{t('footer_calculadora')}</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white/60 font-label text-[10px] uppercase tracking-[0.2em] font-extrabold mb-6">{t('footer_contacto')}</h5>
          <ul className="space-y-3">
            <li><a className="text-white/80 hover:text-white transition-colors text-sm font-light" href="mailto:info@internationalgtc.com">info@internationalgtc.com</a></li>
            <li><a className="text-white/80 hover:text-white transition-colors text-sm font-light" href="https://linkedin.com/company/global-talent-connections-limited" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li>
              <Link className="text-blue-light font-extrabold text-sm tracking-widest uppercase flex items-center gap-2 group" to="/contacto">
                {t('footer_agendar')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
        <p className="text-white/40 text-[10px] font-label uppercase tracking-widest">
          {t('footer_derechos')}
        </p>
        <Link className="text-white/40 hover:text-white transition-colors text-[10px] font-label uppercase tracking-widest" to="/politica-de-privacidad">
          {t('footer_privacidad')}
        </Link>
      </div>
    </footer>
  )
}
