import NewsSection from '../components/NewsSection';

export default function BlogHome() {
  return (
    <div className="pt-5">
      <NewsSection
        title="技术文章"
        cols="row-cols-lg-3"
        category="technical"
      />
    </div>
  );
}