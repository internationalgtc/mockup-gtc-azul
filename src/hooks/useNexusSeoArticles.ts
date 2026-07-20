import { useEffect, useState } from 'react'
import type { BlogPost } from '@/data/blogPosts'

// Trae en vivo los artículos SEO que Nexus-Agentic genera automáticamente
// para GTC (cron diario) — sin esto, el blog era un array fijo en el código
// y había que re-deployar cada vez que se quería sumar contenido nuevo.
const NEXUS_API_URL = 'https://nexus-agentic-ten.vercel.app/api/public/seo-articles'
const GTC_WORKSPACE_ID = '78ab8dcf-f310-4571-9322-ff4588ae1785'
const FALLBACK_IMAGE = '/images/blog-roi-talento-remoto.jpg'

type NexusArticle = {
  slug: string
  keyword: string | null
  title: string
  meta_title: string | null
  meta_description: string | null
  body_html: string
  created_at: string
}

// El generador suele abrir el cuerpo repitiendo el título como <h2>. Como el
// título ya se muestra en la cabecera del artículo, lo sacamos para que no
// parezca un documento con el título dos veces.
function stripDuplicateTitle(html: string, title: string): string {
  const norm = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase()
  const m = html.match(/^\s*<h2>([\s\S]*?)<\/h2>/i)
  if (m && norm(m[1]) === norm(title)) return html.replace(/^\s*<h2>[\s\S]*?<\/h2>/i, '')
  return html
}

function toBlogPost(a: NexusArticle): BlogPost {
  const dateStr = new Date(a.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  const excerpt = a.meta_description ?? ''
  const body = stripDuplicateTitle(a.body_html, a.title)
  return {
    id: a.slug,
    title: { es: a.title, en: a.title },
    excerpt: { es: excerpt, en: excerpt },
    author: 'Global Talent Connections',
    date: { es: dateStr, en: dateStr },
    readTime: '5 min',
    category: { es: 'SEO', en: 'SEO' },
    image: FALLBACK_IMAGE,
    content: { es: body, en: body },
  }
}

export function useNexusSeoArticles(): { posts: BlogPost[]; loading: boolean } {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(`${NEXUS_API_URL}?workspaceId=${GTC_WORKSPACE_ID}`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        const articles = (d.articles as NexusArticle[] | undefined) ?? []
        setPosts(articles.map(toBlogPost))
      })
      .catch(() => { /* si falla, el blog sigue mostrando los posts fijos */ })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { posts, loading }
}
