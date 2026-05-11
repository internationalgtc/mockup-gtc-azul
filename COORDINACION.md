# Coordinacion — Website GTC (.com)

> Este archivo es la fuente de verdad del estado actual del sitio.
> Actualizarlo al final de cada sesion usando `/website-nueva`.
> Git pull lo sincroniza automaticamente cuando abren Claude Code.

---

## Estado actual del sitio (12 mayo 2026)

**Deploy:** https://globaltalent-connections.com (Vercel, produccion)
**Repo:** https://github.com/internationalgtc/mockup-gtc-azul
**Branch principal:** `main`

### Equipo visible en el sitio
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

**Eliminados:** Victor Dominguez, Andersson Figueroa (PR #7, 9 may 2026)

### PRs recientes
- PR #6 MERGED — i18n contenido rebased
- PR #7 OPEN — quitar Victor + Andersson, agregar Rocio, Quality Analyst

---

## Convenciones del repo

### Fotos del equipo
- Archivo: `src/assets/equipo/nombre.png` (minusculas, sin espacios)
- Fuente de datos: `src/data/equipo.ts`
- Cambiar foto = reemplazar el PNG con el mismo nombre. No tocar imports.

### Textos
- Español: `i18n/espanol/es.json`
- Inglés: `i18n/ingles/en.json`
- SIEMPRE actualizar ambos en el mismo commit.

### Vacantes
- Fuente: `src/data/jobs.ts`
- Proximo ID disponible: 82

---

## Log de cambios

| Fecha | Dev | Que cambio |
|-------|-----|------------|
| 2026-05-12 | Ariel | Setup inicial: .claude/settings.json + /website-nueva + COORDINACION.md |

---

## Pendientes

- [ ] Mergear PR #7 (quitar Victor/Andersson, agregar Rocio) — Larisa tiene acceso para mergear sola
- [ ] Fix vacantes: filtro /puestos-vacantes no muestra Drafts (Larisa)
