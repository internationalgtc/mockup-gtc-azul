import type { VercelRequest, VercelResponse } from '@vercel/node'

// Devuelve el país del visitante usando el header que Vercel ya inyecta en
// cada request (x-vercel-ip-country, código ISO de 2 letras, ej "ES", "AR").
// No depende de ningún servicio externo. Si no hay header, devuelve vacío.
export default function handler(req: VercelRequest, res: VercelResponse) {
  const country = (req.headers['x-vercel-ip-country'] as string | undefined) || ''
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({ country })
}
