# COORDINACION.md — GTC Azul Mockup

> Fuente de verdad del estado actual del sitio.
> Actualizar al cerrar cada sesión con `/website-nueva`.
> Git pull lo sincroniza automáticamente al abrir Claude Code.

---

## Estado actual del sitio (12 mayo 2026)

**Deploy:** Vercel (producción automática en push a main)
**Repo:** https://github.com/internationalgtc/mockup-gtc-azul
**Branch principal:** `main`

| Sección | Estado | Responsable |
|---------|--------|-------------|
| Nav / Header | ✅ Completo | - |
| Hero | ✅ Completo | - |
| Stats bar | ✅ Visible | MatheoTe |
| Servicios | ✅ Completo | - |
| Testimonios (video) | ✅ Unificado | MatheoTe |
| Equipo (nosotros) | ✅ Completo | Larisa |
| Calculadora de ahorro | ✅ Funcional | - |
| Blog | ✅ 5 artículos completos con contenido real | MatheoTe |
| Empleos | ✅ Sincronizado con sitio viejo | MatheoTe |
| Footer | ✅ Completo | - |
| i18n ES/EN | ✅ Completo en translations.ts | Larisa + Mateo |

---

## Equipo visible en el sitio

- Daniel Crespo (CEO)
- Ariel Jimenez (AI & Automation Lead)
- Gladymar Torres (HR Business Partner)
- Ana Martinez (Marketing & Sales Lead)
- Pilar Marin (HR & Commercial Lead)
- Reyna Contreras (HR & Commercial Lead)
- Sebastian Acevedo (Quality & Operations Lead)
- Fabiola Lozano (Quality Analyst)
- Suany Artica (Quality Analyst)
- Rocio (Quality Analyst — agregada en PR #7)
- Antonio Cabello (Head of Finance)
- Larisa Spatafora (Dev)
- Nelson Alonso (Dev)
- Javier Martinez (Dev)
- Delfina Palacio (Community Manager)

**Eliminados:** Victor Dominguez, Andersson Figueroa (PR #7, 9 mayo 2026)

---

## PRs recientes

- PR #6 MERGED — i18n contenido rebased
- PR #7 OPEN — quitar Victor + Andersson, agregar Rocio

---

## Convenciones del proyecto

### Fotos del equipo
- Archivo: `assets/equipo/nombre.png` (minúsculas, sin espacios)
- Fuente de datos: `src/data/equipo.ts`
- Cambiar foto = reemplazar el PNG con el **mismo nombre exacto**. No tocar imports.

### Textos / i18n
- **Regla de oro:** ES y EN siempre en el mismo commit
- Archivo: `src/lib/translations.ts` — formato `clave: { es: '...', en: '...' }`
- Agrupar por sección con comentarios `// ── NOMBRE ──`

### Vacantes
- Fuente única: `src/data/jobs.ts`
- Próximo ID disponible: **82**
- Activar/desactivar: campo `active: true/false`

### Git
- Ramas: `feat/<nombre>/<descripcion>` o `fix/<descripcion>`
- Pull Request → revisión → merge a main
- Nunca pushear directo a main salvo hotfixes urgentes
- Prefijos de commit: `feat:` `fix:` `content:` `style:` `i18n:`

---

## Log de cambios

| Fecha | Quién | Qué cambió |
|-------|-------|------------|
| 2026-05-12 | MatheoTe | Blog: 5 artículos con contenido completo sincronizados con página vieja |
| 2026-05-12 | MatheoTe | Fix empleos: agregar job 81 Marketing Lead, desactivar 77/78 |
| 2026-05-12 | Ariel | Setup inicial: .claude/settings.json + /website-nueva + COORDINACION.md |
| 2026-05-12 | MatheoTe | Fix: unificó sección testimonios + visibilidad stats bar |
| 2026-05-12 | MatheoTe | Merge PR #6: i18n + contenido (rama Larisa) rebased |
| 2026-05-06 | MatheoTe | Backup snapshot producción Vercel |
| 2026-05-06 | Larisa | PR #3: sección testimonios en video |

---

## Tareas pendientes

- [ ] Mergear PR #7 (quitar Victor/Andersson, agregar Rocio) — Larisa tiene acceso
- [x] Blog: 5 artículos con contenido completo (sincronizado con página vieja)
- [ ] Contenido real de las tarjetas de Servicios (textos finales)
- [ ] Revisar SEO: meta tags, Open Graph
- [ ] Revisar performance mobile (imágenes pesadas)
- [ ] Larisa + Mateo: aceptar invitación GitHub y clonar repo

---

## Equipo dev

| Persona | GitHub | Rol |
|---------|--------|-----|
| Admin | internationalgtc | Owner |
| Larisa | spataforalarisa-work | Maintain |
| Mateo | MatheoTe | Maintain |
