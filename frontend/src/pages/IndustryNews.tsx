import { useTranslation } from 'react-i18next'
import NewsSection from '../components/NewsSection'
import PageHeader from '../components/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'

export default function IndustryNews() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'

  usePageMeta(
    isZh ? '行业资讯 | 上海奎星电子科技' : 'Industry News | Shanghai Kuixing Electronics',
    isZh
      ? '注塑与塑料行业的最新动态、展会信息与市场趋势。'
      : 'Latest news, exhibitions and market trends from the molding and plastics industry.'
  )

  return (
    <>
      <PageHeader
        kicker={t('nav.techNews')}
        title={t('blog.industryNews')}
        subtitle={t('blog.industrySubtitle')}
        variant="editorial"
        iconClass="bi-newspaper"
        compact
        links={[
          { label: isZh ? '技术文章' : 'Technical Articles', href: '/blog-home' },
          { label: isZh ? '行业资讯' : 'Industry News', href: '/blog-post' },
          { label: isZh ? '资讯首页' : 'News Home', href: '/blog-home#news-feed' }
        ]}
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
