import { useTranslation } from 'react-i18next'
import NewsSection from '../components/NewsSection'
import PageHeader from '../components/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'

// Combined "Tech News" page: technical articles + industry news on one page.
export default function BlogHome() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'

  usePageMeta(
    isZh ? '技术资讯 | 上海奎星电子科技' : 'Tech News | Shanghai Kuixing Electronics',
    isZh
      ? '注塑工艺、模具设计与高性能塑料技术文章，以及注塑与塑料行业的最新动态。'
      : 'Technical articles on injection molding and high-performance plastics, plus the latest industry news.'
  )

  return (
    <>
      <PageHeader
        kicker={t('nav.techNews')}
        title={t('nav.techNews')}
        subtitle={isZh ? '技术文章与行业资讯，集中在一页浏览。' : 'Technical articles and industry news, all on one page.'}
        variant="editorial"
        iconClass="bi-journal-richtext"
        compact
        links={[
          { label: isZh ? '技术文章' : 'Technical Articles', href: '#tech-articles' },
          { label: isZh ? '行业资讯' : 'Industry News', href: '#industry-news' },
          { label: isZh ? '制造能力' : 'Capabilities', href: '/pricing' }
        ]}
      />

      <NewsSection
        id="tech-articles"
        title={t('blog.techArticles')}
        subtitle={t('blog.subtitle')}
        category="technical"
        cols="row-cols-lg-3"
      />

      <NewsSection
        id="industry-news"
        title={t('blog.industryNews')}
        subtitle={t('blog.industrySubtitle')}
        category="industry"
        cols="row-cols-lg-2"
      />
    </>
  )
}
