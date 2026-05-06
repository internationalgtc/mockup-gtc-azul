import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { RevealSection } from '@/components/shared/RevealSection'
import { blogPosts } from '@/data/blogPosts'
import { useT, useLang, l } from '@/hooks/useT'

export default function BlogPage() {
  const t = useT()
  const lang = useLang()

  return (
    <>
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-prime/[0.06] blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-blue-light text-xs font-label uppercase tracking-widest font-bold mb-4 block">{t('blog_label')}</span>
          <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t('blog_titulo_1')} <span className="text-gold">{t('blog_titulo_2')}</span>.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {t('blog_subtitle')}
          </p>
        </div>
      </section>

      <RevealSection className="py-20 lg:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Featured post */}
          <Link
            to={`/blog/${blogPosts[0].id}`}
            className="group bg-white rounded-2xl overflow-hidden border border-border-soft hover:shadow-2xl hover:border-blue-prime/20 transition-all mb-8 block"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={blogPosts[0].image}
                  alt={l(blogPosts[0].title, lang)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-coral text-white text-[10px] font-label font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {l(blogPosts[0].category, lang)}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-dark-gray text-xs font-label mb-4">
                  <span>{l(blogPosts[0].date, lang)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blogPosts[0].readTime}</span>
                </div>
                <h2 className="font-headline font-bold text-navy text-2xl lg:text-3xl mb-3 group-hover:text-blue-prime transition-colors">
                  {l(blogPosts[0].title, lang)}
                </h2>
                <p className="text-dark-gray leading-relaxed mb-6">{l(blogPosts[0].excerpt, lang)}</p>
                <span className="text-blue-prime text-xs font-label uppercase tracking-widest font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t('blog_leer_mas')} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border-soft hover:shadow-2xl hover:border-blue-prime/20 transition-all"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.image}
                    alt={l(post.title, lang)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-coral text-white text-[10px] font-label font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {l(post.category, lang)}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 text-dark-gray text-xs font-label mb-3">
                    <span>{l(post.date, lang)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="font-headline font-bold text-navy text-lg mb-3 group-hover:text-blue-prime transition-colors">
                    {l(post.title, lang)}
                  </h2>
                  <p className="text-dark-gray text-sm leading-relaxed mb-4">{l(post.excerpt, lang)}</p>
                  <span className="text-blue-prime text-xs font-label uppercase tracking-widest font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t('blog_leer_mas')} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  )
}
