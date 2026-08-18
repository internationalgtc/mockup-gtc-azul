# Website Nueva — Agente compartido Larisa + Mateo

Sos el agente de desarrollo del sitio web de GTC en `globaltalent-connections.com`. Este repo es `internationalgtc/mockup-gtc-azul`.

## Contexto del repo

```
mockup-gtc-azul/
├── src/
│   ├── data/
│   │   ├── equipo.ts        ← fotos + datos del equipo (FUENTE DE VERDAD)
│   │   ├── jobs.ts          ← vacantes publicadas
│   │   ├── blogPosts.ts     ← posts del blog
│   │   └── chatbotData.ts   ← árbol del chatbot
│   ├── assets/equipo/       ← fotos del equipo (.png, nombre = persona)
│   ├── pages/               ← Index, Nosotros, Servicios, Empleos, Contacto...
│   └── components/          ← Testimonials, layout/, shared/, ui/
├── i18n/
│   ├── espanol/es.json      ← todos los textos en español
│   └── ingles/en.json       ← todos los textos en inglés (SIEMPRE actualizar junto con es.json)
└── COORDINACION.md          ← estado actual + log de cambios del equipo
```

## Reglas críticas para no romper nada

### Fotos del equipo
- Las fotos van en `src/assets/equipo/nombre.png`
- Los imports están en `src/data/equipo.ts` — si cambiás una foto, solo cambiá el archivo PNG con el mismo nombre. No toques los imports.
- Si agregás una persona nueva: 1) agregá la foto, 2) agregá el import en equipo.ts, 3) agregá el objeto en el array `equipo`.
- Si sacás una persona: 1) eliminá su entrada del array en equipo.ts, 2) borrá el PNG, 3) eliminá el import.

### Idiomas (i18n)
- NUNCA cambies texto en un solo archivo. Toda edición de texto es DOBLE: `es.json` + `en.json` al mismo tiempo.
- La estructura de claves debe ser idéntica en ambos archivos.
- Si agregás una clave nueva en uno, la agregás en el otro en el mismo commit.

### Secciones / componentes
- Antes de crear un componente nuevo, revisá si ya existe algo similar en `src/components/`.
- Los textos de secciones van en i18n, no hardcodeados en los componentes.
- Las imágenes de fondo o decorativas van en `public/` (sin imports), no en `src/assets/`.

---

## Lo que hacés cuando te invocan

1. Leé `COORDINACION.md` para saber el estado actual del sitio y qué estaba haciendo el otro dev.
2. Preguntá qué hay que cambiar — si el pedido es ambiguo, pedí ejemplos concretos.
3. Hacé el cambio siguiendo las reglas de arriba.
4. Antes de terminar, actualizá `COORDINACION.md` con lo que hiciste.

---

## Cómo cerrar la sesión (equivalente a /done-equipo)

Cuando el dev diga que terminó, ejecutá automáticamente:

1. Pedile un resumen de 1-2 líneas de lo que hizo.
2. Actualizá `COORDINACION.md`: append al log con fecha, quién, qué cambió.
3. Hacé commit + push:
   ```
   git add -A
   git commit -m "feat(sitio): [resumen del cambio]"
   git push origin main
   ```
4. Confirmá con: "Cambios guardados. El otro dev los va a ver en el próximo git pull."

---

## Conocimiento experto: sitios web para reclutamiento profesional

### Qué convierte un visitor en lead (lo que importa en este sitio)
- **Propuesta de valor en 5 segundos**: el hero debe decir QUÉ hacés, PARA QUIÉN y POR QUÉ confiar. No frases genéricas.
- **Prueba social inmediata**: números reales (102 asistentes activos, 47 clientes, 9.06/10 satisfacción), no "miles de clientes".
- **CTA visible sin scroll**: el botón "Contratar asistente" tiene que estar above the fold en desktop y mobile.
- **Velocidad**: fotos del equipo < 150KB cada una. Usar WebP cuando sea posible.

### Estructura ideal para este tipo de sitio
1. Hero — propuesta de valor + CTA principal
2. Social proof — números + logos de clientes (si hay permiso)
3. Cómo funciona — proceso en 3-4 pasos, simple
4. Servicios — qué tipos de asistentes ofrecen
5. Equipo — fotos reales, nombres, roles (ya existe)
6. Testimonios — quotes de clientes reales con nombre y empresa
7. FAQ — responde las 5 objeciones principales
8. CTA final — formulario de contacto o botón directo

### Antipatrones a evitar
- Texto genérico ("soluciones innovadoras", "equipo dedicado") — reemplazar siempre por datos reales
- Fotos de stock de personas — el equipo real genera más confianza
- Formularios con más de 4 campos — cada campo adicional reduce conversión ~10%
- Menú con más de 5 ítems — los visitors se pierden
- i18n incompleto — una palabra en el idioma equivocado rompe la confianza

### Paleta GTC (no cambiar sin aprobación de Ariel)
- Primario: azul corporativo del diseño actual
- Tipografía: la que está configurada en tailwind.config.ts
- No agregar fuentes nuevas sin confirmación

---

## Quién trabaja en este repo
- **Larisa Spatafora** (`spataforalarisa-work`) — Dev, dominio marketing + onboarding
- **Mateo Telesca** (`MatheoTe`) — Dev, dominio marketing automatizado
- **Ariel Jimenez** — Tech Lead (NO lo llames para cambios del sitio — para eso están ustedes)
