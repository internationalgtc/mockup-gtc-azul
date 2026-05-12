# CLAUDE.md — mockup-gtc-azul / Global Talent Connections Website

## Regla principal

Este proyecto tiene un design system definido y aprobado. Toda modificación — sin excepción — debe respetar ese sistema. Nunca introducir colores, tipografías o estilos distintos a los documentados.

Guía completa de diseño: `/Users/larisaspatafora/Desktop/_memoria_gtc/_MEMORIA_GTC/guia-diseno-globaltalent.md`

Leer esa guía antes de tocar cualquier componente visual.

---

## Paleta de colores — ÚNICA permitida

| Token Tailwind | Hex | Uso |
|---|---|---|
| `bg-navy` / `text-navy` | `#062E55` | Fondo hero, secciones oscuras, texto H2-H3 en claro |
| `bg-navy-soft` | `#0A2444` | Solo navbar y footer |
| `bg-blue-prime` / `text-blue-prime` | `#2280AD` | Accents, íconos, eyebrow labels, links |
| `text-blue-deep` | `#1A6590` | Variante azul más oscura |
| `text-blue-light` | `#4AADDB` | Links footer, badges secundarios |
| `bg-coral` / `text-coral` | `#FF6B47` | CTA primario y números destacados. Nunca texto largo. |
| `bg-gold` / `text-gold` | `#F59E0B` | CTA secundario outline, estadísticas de ahorro |
| `text-dark-gray` | `#37516B` | Texto secundario en fondos claros |
| `bg-off-white` | `#F7F7F7` | Fondo secciones neutras |
| `bg-cream` | `#F0EDE8` | Fondo secciones cálidas alternadas |

**NUNCA** usar colores fuera de esta lista (naranja genérico, grises de Tailwind por defecto, azules de sistema, etc.).

---

## Tipografía — ÚNICA permitida

```
Montserrat → Títulos y headings (H1, H2, H3) → font-headline
Lato       → Cuerpo de texto, párrafos       → font-body (o font-light)
Inter      → Labels, botones CTA, nav links  → font-label
```

**NUNCA** usar `font-sans`, `font-mono`, `font-serif` de Tailwind por defecto.
**NUNCA** agregar fuentes nuevas sin aprobar primero.

---

## Reglas de implementación

1. Antes de crear cualquier componente nuevo: verificar si ya existe en `src/components/ui/` o `src/components/shared/`.
2. Toda sección nueva debe seguir el patrón de alternancia de fondos: `bg-navy → bg-off-white → bg-cream → bg-off-white → bg-navy`.
3. Todos los botones van en `uppercase` con `tracking-widest`.
4. Cada sección lleva eyebrow label (Inter 12px 800 uppercase `text-blue-prime`) antes del H2.
5. Los glows decorativos en secciones navy usan `bg-blue-prime/[0.08]` con `blur-[120px]` y `rounded-full`.
6. Cards: `bg-white rounded-xl border border-border-soft` — nunca shadow sin border.
7. Imágenes: siempre con overlay `blue-overlay` o gradiente navy encima.

---

## Stack

- React + TypeScript estricto (sin `any`)
- Vite + Tailwind CSS
- Componentes compartidos: `src/components/shared/`
- Datos estáticos: `src/data/`

## Deploy

- Proyecto Vercel: `gtc2/mockup-gtc-azul`
- URL producción: `https://mockup-gtc-azul.vercel.app`
- Antes de deployar: `npm run build` debe pasar sin errores TypeScript
- Comando deploy: `vercel --prod` (con nvm node v20.20.2 activo)
