import { useTranslation } from 'react-i18next'
import NewsSection from '../components/NewsSection'

export default function BlogHome() {
  const { t } = useTranslation()

  return (
    <div className="pt-5">
      <NewsSection
        title={t('blog.techArticles')}
        cols="row-cols-lg-3"
        category="technical"
      />
    </div>
  )
}
