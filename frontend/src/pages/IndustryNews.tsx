import { useTranslation } from 'react-i18next'
import NewsSection from '../components/NewsSection'

export default function IndustryNews() {
  const { t } = useTranslation()

  return (
    <div className="pt-5">
      <NewsSection
        title={t('blog.industryNews')}
        cols="row-cols-lg-2"
        category="industry"
      />
    </div>
  )
}
