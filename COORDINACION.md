# COORDINACION.md — GTC Azul Mockup

Estado del sitio, convenciones y log de cambios. **Actualizar al cerrar cada sesión con /website-nueva.**

---

## Estado actual del sitio (2026-05-12)

| Sección | Estado | Responsable |
|---------|--------|-------------|
| Nav / Header | ✅ Completo | - |
| Hero | ✅ Completo | - |
| Stats bar | ✅ Visible (fix aplicado) | MatheoTe |
| Servicios | ✅ Completo | - |
| Testimonios (video) | ✅ Unificado (fix aplicado) | MatheoTe |
| Equipo (nosotros) | ✅ Completo | Larisa |
| Calculadora de ahorro | ✅ Funcional | - |
| Blog | ✅ Estructura lista | - |
| Empleos | ✅ Estructura lista | - |
| Footer | ✅ Completo | - |
| i18n ES/EN | ✅ Completo en translations.ts | Larisa + Mateo |

**Rama activa:** `main`  
**Deploy:** Vercel (producción automática en cada push a main)  
**Repo:** https://github.com/internationalgtc/mockup-gtc-azul

---

## Convenciones del proyecto

### Fotos e imágenes
- Reemplazar el PNG con el **mismo nombre exacto** → el import no cambia
- Carpeta de equipo: `assets/equipo/`
- Logos de clientes: `assets/logos/`
- Fotos de empleos/blog: `public/img-empleos/`
- **NO renombrar archivos** ni cambiar rutas → rompe imports en toda la app

### i18n (traducciones)
- **Regla de oro:** ES y EN siempre en el mismo commit, en `src/lib/translations.ts`
- Formato: `clave: { es: '...', en: '...' }`
- Agrupar por sección con comentarios `// ── NOMBRE ──`
- Si agregas texto nuevo, agregar la clave a `translations.ts` antes de usarla en el componente

### Git
- Trabajar en ramas con nombre `feat/<tu-nombre>/<descripcion>` o `fix/<descripcion>`
- Pull Request → revisión → merge a main
- **Nunca pushear directo a main** salvo hotfixes urgentes
- Mensaje de commit: `feat:`, `fix:`, `content:`, `style:` como prefijo
- El git pull automático corre al abrir Claude Code en la carpeta del repo

### Componentes
- Un componente = un archivo en `src/components/`
- Subcarpetas: `layout/` (Header, Footer, Layout), `shared/` (elementos reutilizables)
- Los componentes de sección van directo en `src/components/`

---

## Log de cambios

| Fecha | Quién | Qué cambió |
|-------|-------|------------|
| 2026-05-12 | MatheoTe | Fix: unificó sección testimonios + visibilidad stats bar |
| 2026-05-12 | MatheoTe | Merge PR #6: i18n + contenido (rama Larisa) rebased |
| 2026-05-06 | MatheoTe | Backup snapshot producción Vercel |
| 2026-05-06 | Larisa | PR #3: sección testimonios en video |
| 2026-05-06 | Larisa | Fotos equipo (portrait, Larisa incluida) |

---

## Tareas pendientes

- [ ] Contenido real de las tarjetas de Servicios (textos finales)
- [ ] Fotos reales de testimonios/clientes si los hay
- [ ] Revisar SEO: meta tags, Open Graph
- [ ] Revisar performance mobile (imágenes pesadas)
- [ ] Larisa + Mateo: aceptar invitación GitHub y clonar repo

---

## Contacto del equipo

| Persona | GitHub | Rol |
|---------|--------|-----|
| Admin | internationalgtc | Owner |
| Larisa | spataforalarisa-work | Maintain |
| Mateo | MatheoTe | Maintain |
