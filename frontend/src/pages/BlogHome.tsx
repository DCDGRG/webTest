import { useTranslation } from 'react-i18next'
import NewsSection from '../components/NewsSection'
import PageHeader from '../components/PageHeader'

export default function BlogHome() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        kicker={t('nav.techNews')}
        title={t('blog.techArticles')}
        subtitle={t('blog.subtitle')}
        iconClass="bi-journal-richtext"
        compact
      />

      <div className="py-5">
        <NewsSection
          title=""
          cols="row-cols-lg-3"
          category="technical"
        />
      </div>
    </>
  )
}
