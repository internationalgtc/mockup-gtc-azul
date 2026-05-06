import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import logoWhite from '@/assets/logos/LogoLetrasBlancas.png'

export function Footer() {
  return (
    <footer className="bg-navy-soft border-t border-blue-prime/20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 py-20">
        <div className="space-y-6">
          <img src={logoWhite} alt="Global Talent Connections" className="h-10 w-auto object-contain" loading="lazy" />
          <p className="text-white/70 text-sm font-light leading-relaxed">
            Outsourcing estratégico de talento para empresas europeas y americanas.
          </p>
        </div>

        <div>
          <h5 className="text-white/60 font-label text-[10px] uppercase tracking-[0.2em] font-extrabold mb-6">Empresa</h5>
          <ul className="space-y-3">
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/nosotros">Sobre nosotros</Link></li>
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/servicios">Servicios</Link></li>
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/empleos">Empleos</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white/60 font-label text-[10px] uppercase tracking-[0.2em] font-extrabold mb-6">Recursos</h5>
          <ul className="space-y-3">
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/blog">Blog</Link></li>
            <li><Link className="text-white/80 hover:text-white transition-colors text-sm font-light" to="/calculadora-ahorro">Calculadora de ahorro</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white/60 font-label text-[10px] uppercase tracking-[0.2em] font-extrabold mb-6">Contacto</h5>
          <ul className="space-y-3">
            <li><a className="text-white/80 hover:text-white transition-colors text-sm font-light" href="mailto:info@internationalgtc.com">info@internationalgtc.com</a></li>
            <li><a className="text-white/80 hover:text-white transition-colors text-sm font-light" href="https://linkedin.com/company/global-talent-connections-limited" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li>
              <Link className="text-blue-light font-extrabold text-sm tracking-widest uppercase flex items-center gap-2 group" to="/contacto">
                Agendar llamada
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
        <p className="text-white/40 text-[10px] font-label uppercase tracking-widest">
          2025 Global Talent Connections. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-lg" title="España">🇪🇸</span>
          <span className="text-lg" title="Estados Unidos">🇺🇸</span>
          <Link className="text-white/40 hover:text-white transition-colors text-[10px] font-label uppercase tracking-widest" to="/politica-de-privacidad">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
