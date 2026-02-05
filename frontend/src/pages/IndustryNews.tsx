import NewsSection from '../components/NewsSection';

export default function IndustryNews() {
    return (
        <div className="pt-5">
            <NewsSection
                title="行业动态"
                cols="row-cols-lg-2"
                category="industry"
            />
        </div>
    );
}
