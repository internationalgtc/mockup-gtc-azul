import type { VercelRequest, VercelResponse } from '@vercel/node'

type Message = { role: 'user' | 'assistant'; content: string }

const ALLOWED_ORIGINS = [
  'https://www.globaltalentconnections.es',
  'https://globaltalentconnections.es',
  'https://www.globaltalent-connections.com',
  'https://globaltalent-connections.com',
  'https://mockup-gtc-azul.vercel.app',
  'https://websiteglobaltalentconnections-wine.vercel.app',
  'https://websiteglobaltalentconnections-gtc2.vercel.app',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000',
]

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin !== null && (
    ALLOWED_ORIGINS.includes(origin) ||
    /^https:\/\/websiteglobaltalentconnections.*\.vercel\.app$/.test(origin) ||
    /^https:\/\/mockup-gtc-azul-.*\.vercel\.app$/.test(origin)
  )
  const allowedOrigin = isAllowed ? origin! : ALLOWED_ORIGINS[0]!
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

const GREETING = '¡Hola! Soy el asistente virtual de Global Talent Connections. ¿Con quién tengo el placer de hablar?'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BUDGET_OPTIONS = [
  { key: '1', label: 'Entre 1.100€ y 1.300€/mes', value: '1100' },
  { key: '2', label: 'Entre 1.300€ y 1.500€/mes', value: '1300' },
  { key: '3', label: 'Entre 1.500€ y 2.000€/mes', value: '1500' },
]
const BUDGET_QUESTION = `¿Cuál es el rango de inversión mensual que tenés contemplado para el asistente?\n\nEsto nos ayuda a recomendarte el perfil que mejor se ajusta.`

const URGENCY_OPTIONS = [
  { key: '1', label: 'Esta semana' },
  { key: '2', label: 'Este mes' },
  { key: '3', label: 'En los próximos 2-3 meses' },
  { key: '4', label: 'Estoy explorando opciones' },
]
const URGENCY_QUESTION = `¿Para cuándo necesitarías que el asistente se incorpore a tu equipo?`

const ASSISTANT_TYPE_OPTIONS = [
  { key: '1', label: 'Administrativo' },
  { key: '2', label: 'Marketing Digital' },
  { key: '3', label: 'Financiero / Contable' },
  { key: '4', label: 'Desarrollo Web' },
  { key: '5', label: 'Diseño Gráfico' },
  { key: '6', label: 'Atención al Cliente' },
  { key: '7', label: 'RRHH / Reclutamiento' },
  { key: '8', label: 'Otro' },
]
const ASSISTANT_TYPE_QUESTION = `¿Qué tipo de perfil estás buscando?`

function extractName(text: string): string {
  const clean = text.trim()
  const match = clean.match(
    /(?:me llamo|soy|mi nombre es|me llaman|mi nombre:|nombre:)\s+([A-Za-záéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[A-Za-záéíóúÁÉÍÓÚüÜñÑ]+)*)/i
  )
  return match ? match[1]!.trim() : clean
}

function parseBudget(text: string): { label: string; value: string } | null {
  const clean = text.trim()
  return BUDGET_OPTIONS.find(o => o.key === clean || o.label.toLowerCase() === clean.toLowerCase()) ?? null
}

async function callGemini(messages: Message[]): Promise<string> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai')
  const apiKey = process.env.GEMINI_CHATBOT_KEY ?? process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('No Gemini key')

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const systemPrompt = `Eres un asistente de reclutamiento de Global Talent Connections. Ayudás a empresas norteamericanas y europeas a contratar talento remoto latinoamericano de alta calidad.

Tu misión es recopilar exactamente 7 datos del visitante (dueño o responsable de una empresa que quiere contratar), en este orden estricto, uno por vez:
1. Nombre completo
2. Empresa o nombre del negocio
3. Email de contacto
4. Cargo o función en la empresa
5. Rango de inversión mensual — SIEMPRE presentar el texto exacto: "¿Cuál es el rango de inversión mensual que tenés contemplado para el asistente?\n\nEsto nos ayuda a recomendarte el perfil que mejor se ajusta." — el sistema mostrará botones automáticamente. Si el usuario escribe algo en vez de elegir un botón, recordale que debe seleccionar una de las 3 opciones: Entre 1.100€ y 1.300€/mes, Entre 1.300€ y 1.500€/mes, Entre 1.500€ y 2.000€/mes.
6. Disponibilidad de incorporación — SIEMPRE presentar el texto exacto: "¿Para cuándo necesitarías que el asistente se incorpore a tu equipo?" — el sistema mostrará botones automáticamente. Si el usuario escribe algo en vez de elegir un botón, recordale que debe seleccionar una de las 4 opciones: Esta semana, Este mes, En los próximos 2-3 meses, Estoy explorando opciones.
7. Tipo de perfil — SIEMPRE presentar el texto exacto: "¿Qué tipo de perfil estás buscando?" — el sistema mostrará botones automáticamente. Si el usuario escribe algo en vez de elegir un botón, recordale que debe seleccionar una de las opciones: Administrativo, Marketing Digital, Financiero / Contable, Desarrollo Web, Diseño Gráfico, Atención al Cliente, RRHH / Reclutamiento, Otro.

Reglas estrictas:
- Haz UNA sola pregunta a la vez, en el orden indicado, sin saltarte ningún paso
- No avances al siguiente dato hasta obtener una respuesta válida del anterior
- VALIDACIÓN DE EMAIL: un email válido DEBE contener @ y un dominio. Si el usuario escribe algo sin @, NO es un email — pedilo de nuevo
- Usa español neutro, tono profesional pero cercano

Cuando tengas los 7 datos válidos, confirmá el registro con un mensaje corto y amigable. Después, en la MISMA respuesta en una línea separada al final, escribí exactamente (sin markdown):
GTC_LEAD:{"name":"[nombre]","company":"[empresa]","email":"[email]","role":"[cargo]","need":"[tipo de perfil]","budget":"[1100|1300|1500]","budget_label":"[opción elegida]","urgency":"[opción elegida]"}`

  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'user' ? 'user' as const : 'model' as const,
    parts: [{ text: m.content }],
  }))

  const chat = model.startChat({ systemInstruction: systemPrompt, history })
  const result = await chat.sendMessage(messages[messages.length - 1]!.content)
  return result.response.text()
}

function qualificationFlow(messages: Message[]): string {
  const user = messages.filter(m => m.role === 'user')
  if (user.length === 0) return GREETING
  if (user.length === 1) return `¡Encantado, ${extractName(user[0]!.content)}! ¿A qué empresa pertenece?`
  if (user.length === 2) return `Perfecto. ¿Cuál es su correo electrónico de contacto?`

  const emailIndex = user.findIndex((m, i) => i >= 2 && EMAIL_REGEX.test(m.content.trim()))
  if (emailIndex === -1) return `Ese no parece un email válido. Por favor ingresá tu dirección de correo (ejemplo: nombre@empresa.com).`

  const email = user[emailIndex]!.content.trim()
  if (user.length === emailIndex + 1) return `Gracias. ¿Cuál es su cargo o función en ${user[1]!.content.trim()}?`
  if (user.length === emailIndex + 2) return BUDGET_QUESTION

  const budget = parseBudget(user[emailIndex + 2]!.content.trim())
  if (!budget) return BUDGET_QUESTION
  if (user.length === emailIndex + 3) return URGENCY_QUESTION

  const urgency = user[emailIndex + 3]!.content.trim()
  if (!URGENCY_OPTIONS.some(o => o.label.toLowerCase() === urgency.toLowerCase())) return URGENCY_QUESTION
  if (user.length === emailIndex + 4) return ASSISTANT_TYPE_QUESTION

  const needRaw = user[emailIndex + 4]!.content.trim()
  if (!ASSISTANT_TYPE_OPTIONS.some(o => o.label.toLowerCase() === needRaw.toLowerCase())) return ASSISTANT_TYPE_QUESTION

  const name = extractName(user[0]!.content)
  const company = user[1]!.content.trim()
  const role = user[emailIndex + 1]!.content.trim()
  return `¡Perfecto, ${name}! Su consulta ha quedado registrada ✅ Un asesor de GTC se pondrá en contacto a la brevedad.\nGTC_LEAD:{"name":"${name}","company":"${company}","email":"${email}","role":"${role}","need":"${needRaw}","budget":"${budget.value}","budget_label":"${budget.label}","urgency":"${urgency}"}`
}

type LeadTemperature = { label: string; emoji: string; score: number }

function qualifyLead(role: string, budget: string, need: string, urgency: string): LeadTemperature {
  // Authority — can this person say yes without approval?
  const roleLower = role.toLowerCase()
  let authorityScore = 15
  if (/ceo|founder|co-?founder|dueñ|owner|propietari|president|director general|socio|dueno/.test(roleLower)) {
    authorityScore = 35
  } else if (/director|vp |vice|cto|cmo|coo|cfo|c[a-z]o\b|gerente general/.test(roleLower)) {
    authorityScore = 28
  } else if (/gerente|manager|jefe|head of|head /.test(roleLower)) {
    authorityScore = 20
  } else if (/coordinador|supervisor/.test(roleLower)) {
    authorityScore = 12
  } else if (/analista|asistente|especialista|ejecutiv/.test(roleLower)) {
    authorityScore = 6
  }

  // Budget — financial capacity
  const budgetScore = budget === '1500' ? 35 : budget === '1300' ? 25 : 15

  // Clarity of need — specific profile + defined timeline
  const isSpecificProfile = need.toLowerCase() !== 'otro'
  const isDefinedTimeline = urgency.toLowerCase() !== 'estoy explorando opciones'
  const clarityScore =
    isSpecificProfile && isDefinedTimeline  ? 30 :
    isSpecificProfile && !isDefinedTimeline ? 20 :
    !isSpecificProfile && isDefinedTimeline ? 15 : 5

  const score = authorityScore + budgetScore + clarityScore

  const label =
    score >= 80 ? 'Caliente' :
    score >= 55 ? 'Tibio'    :
    score >= 30 ? 'Templado' : 'Frío'

  const emoji =
    score >= 80 ? '🔥' :
    score >= 55 ? '♨️'  :
    score >= 30 ? '🌡️' : '❄️'

  return { label, emoji, score }
}

async function forwardLead(leadData: {
  name: string; company: string; email: string
  role: string; need: string; budget: string; budget_label: string; urgency: string
}) {
  const temp = qualifyLead(leadData.role, leadData.budget, leadData.need, leadData.urgency)
  try {
    await fetch('https://www.globaltalentconnections.online/api/leads/public', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contact_name:   leadData.name,
        contact_email:  leadData.email,
        company_name:   leadData.company,
        assistant_type: leadData.need,
        description:    `Cargo: ${leadData.role} | Incorporación: ${leadData.urgency} | Temperatura: ${temp.emoji} ${temp.label} (${temp.score}pts)`,
        budget_option:  leadData.budget,
        source:         'chatbot_web',
      }),
    })
  } catch (err) {
    console.error('forwardLead failed', err)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = (req.headers['origin'] as string) ?? null
  const cors = getCorsHeaders(origin)
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v))

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { messages } = req.body as { messages: Message[] }

    if (!messages?.length) {
      return res.json({ message: GREETING, leadCreated: false })
    }

    const lastBotMsg  = [...messages].reverse().find(m => m.role === 'assistant')?.content ?? ''
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content ?? ''
    if (/correo|e-?mail/i.test(lastBotMsg) && !EMAIL_REGEX.test(lastUserMsg.trim())) {
      const retry = `"${lastUserMsg.trim()}" no es un email válido. Necesito tu dirección de correo electrónico (ejemplo: nombre@empresa.com).`
      return res.json({ message: retry, leadCreated: false })
    }

    const apiKey = process.env.GEMINI_CHATBOT_KEY ?? process.env.GEMINI_API_KEY
    let rawMessage: string
    if (apiKey) {
      try { rawMessage = await callGemini(messages) }
      catch { rawMessage = qualificationFlow(messages) }
    } else {
      rawMessage = qualificationFlow(messages)
    }

    const leadMatch    = rawMessage.match(/GTC_LEAD:(\{[\s\S]*?\})/)
    const cleanMessage = rawMessage.replace(/\s*GTC_LEAD:\{[\s\S]*?\}/, '').trim()
    let leadCreated    = false

    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1]!)
        if (leadData.email && EMAIL_REGEX.test(leadData.email)) {
          forwardLead(leadData)
          leadCreated = true
        }
      } catch {
        console.warn('Malformed GTC_LEAD JSON')
      }
    }

    const msg = cleanMessage.trim()
    const quickReplies =
      msg === BUDGET_QUESTION.trim()         ? BUDGET_OPTIONS.map(o => o.label) :
      msg === URGENCY_QUESTION.trim()        ? URGENCY_OPTIONS.map(o => o.label) :
      msg === ASSISTANT_TYPE_QUESTION.trim() ? ASSISTANT_TYPE_OPTIONS.map(o => o.label) :
      null

    return res.json({ message: cleanMessage, leadCreated, ...(quickReplies ? { quickReplies } : {}) })
  } catch (err) {
    console.error('chat/lead error', err)
    return res.status(500).json({ error: 'Error interno' })
  }
}
