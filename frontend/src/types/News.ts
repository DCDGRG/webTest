export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    published_at: string;
    source_name: string;
    category: string;
    image_url?: string | null;
    created_at: string;
}
