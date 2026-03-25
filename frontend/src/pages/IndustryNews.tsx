import { useTranslation } from 'react-i18next'
import NewsSection from '../components/NewsSection'
import PageHeader from '../components/PageHeader'

export default function IndustryNews() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        kicker={t('nav.techNews')}
        title={t('blog.industryNews')}
        subtitle={t('blog.industrySubtitle')}
        iconClass="bi-newspaper"
        compact
      />

      <div className="py-5">
        <NewsSection
          title=""
          cols="row-cols-lg-2"
          category="industry"
        />
      </div>
    </>
  )
}
