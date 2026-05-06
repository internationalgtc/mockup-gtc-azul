import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useT } from '@/hooks/useT'
import logoWhite from '@/assets/logos/LogoLetrasBlancas.png'

const NAV_KEYS = [
  { key: 'nav_servicios', href: '/servicios' },
  { key: 'nav_nosotros', href: '/nosotros' },
  { key: 'nav_blog', href: '/blog' },
  { key: 'nav_calculadora', href: '/calculadora-ahorro' },
  { key: 'nav_empleos', href: '/empleos' },
  { key: 'nav_contacto', href: '/contacto' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const t = useT()
  const currentLang = i18n.language === 'en' ? 'EN' : 'ES'

  const toggleLang = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
    localStorage.setItem('i18nextLng', newLang)
  }

  return (
    <header className="bg-navy-soft/95 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-blue-prime/20">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-prime text-white px-4 py-2 rounded-md z-[60]">
        {i18n.language === 'en' ? 'Skip to content' : 'Ir al contenido'}
      </a>

      <nav className="flex justify-between items-center px-6 lg:px-8 py-4 w-full max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-3" aria-label="Global Talent Connections - Inicio">
          <img src={logoWhite} alt="Global Talent Connections" className="h-8 lg:h-10 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_KEYS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-label text-sm tracking-widest uppercase transition-colors ${
                pathname === link.href
                  ? 'text-gold font-bold border-b-2 border-gold pb-1'
                  : 'text-white/80 hover:text-blue-light'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors font-label text-xs tracking-widest uppercase"
            aria-label={`Change language to ${currentLang === 'ES' ? 'English' : 'Spanish'}`}
          >
            <Globe className="w-4 h-4" />
            <span className="font-bold">{currentLang}</span>
          </button>
          <Link
            to="/contacto"
            className="hidden lg:flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-md font-label text-xs tracking-widest uppercase font-bold hover:bg-coral/90 hover:scale-95 transition-all"
          >
            {t('nav_cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            className="md:hidden text-white/80 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/5 px-6 pb-6">
          <div className="flex flex-col gap-4 pt-4">
            {NAV_KEYS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-label text-sm tracking-widest uppercase py-2 ${
                  pathname === link.href ? 'text-gold font-bold' : 'text-white/80'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={() => setMenuOpen(false)}
              className="bg-coral text-white px-6 py-3 rounded-md font-label text-xs tracking-widest uppercase font-bold text-center mt-2"
            >
              {t('nav_cta')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
