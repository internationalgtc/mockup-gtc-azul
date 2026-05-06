import { useTranslation } from 'react-i18next'
import { t as translate } from '@/lib/translations'

export function useT() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'
  return (key: string) => translate(key, lang)
}

export function useLang(): 'es' | 'en' {
  const { i18n } = useTranslation()
  return i18n.language === 'en' ? 'en' : 'es'
}

export function l<T>(obj: { es: T; en: T }, lang: 'es' | 'en'): T {
  return obj[lang]
}
