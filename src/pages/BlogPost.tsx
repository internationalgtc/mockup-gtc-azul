import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, User } from 'lucide-react'
import { blogPosts } from '@/data/blogPosts'
import { useT, useLang, l } from '@/hooks/useT'

export default function BlogPostPage() {
  const { id } = useParams()
  const t = useT()
  const lang = useLang()
  const post = blogPosts.find(p => p.id === id)

  if (!post) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-headline font-bold text-4xl text-navy mb-4">{t('blog_not_found')}</h1>
          <Link to="/blog" className="text-blue-prime font-bold hover:underline">{t('blog_volver')}</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full -mr-48" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> {t('blog_volver')}
          </Link>
          <span className="bg-coral text-white text-[10px] font-label font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block">
            {l(post.category, lang)}
          </span>
          <h1 className="font-headline font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            {l(post.title, lang)}
          </h1>
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
            <span>{l(post.date, lang)}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-off-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
            <img src={post.image} alt={l(post.title, lang)} className="w-full h-[300px] lg:h-[450px] object-cover" />
          </div>
          <div className="bg-white rounded-2xl p-8 lg:p-14 border border-border-soft">
            <p className="text-navy/80 text-lg leading-relaxed mb-8">{l(post.excerpt, lang)}</p>
            {post.content ? (
              <div
                className="prose prose-lg max-w-none text-dark-gray blog-content"
                dangerouslySetInnerHTML={{ __html: l(post.content, lang) }}
              />
            ) : (
              <div className="prose prose-lg max-w-none text-dark-gray">
                <p className="leading-relaxed">{t('blog_placeholder')}</p>
              </div>
            )}
            <div className="mt-12 pt-8 border-t border-border-soft flex items-center justify-between">
              <Link to="/blog" className="text-blue-prime font-label font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" /> {t('blog_mas_articulos')}
              </Link>
              <Link to="/contacto" className="bg-coral text-white px-6 py-3 rounded-md font-label font-bold text-xs tracking-widest uppercase hover:bg-coral/90 transition-all">
                {t('nav_contacto')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
