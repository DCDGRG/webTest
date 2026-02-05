import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser();

// Configuration
const OUTPUT_FILE = path.join(__dirname, '../public/data/news.json');

// Define RSS Sources
// Note: Real injection molding specific RSS feeds might be rare. 
// These are placeholders or generic tech/industry feeds. 
// The user should replace these with actual industry sources they follow.
const SOURCES = [
    {
        name: '行业动态 (Mock)',
        url: 'MOCK_INDUSTRY_FEED',
        category: 'industry',
        tags: ['market', 'news']
    },
    {
        name: '技术前沿 (Mock)',
        url: 'MOCK_TECHNICAL_FEED',
        category: 'technical',
        tags: ['paper', 'research']
    }
];

// Helper to sanitize and normalize content
function normalizeItem(item, source) {
    return {
        id: item.guid || item.link,
        title: item.title,
        summary: item.contentSnippet ? item.contentSnippet.substring(0, 150) + '...' : '',
        url: item.link,
        published_at: item.pubDate, // Mock items will have pubDate
        source_name: source.name,
        category: source.category,
        image_url: null,
        created_at: new Date().toISOString()
    };
}

async function main() {
    console.log('Starting News Aggregation...');

    let existingNews = [];
    try {
        const data = await fs.readFile(OUTPUT_FILE, 'utf-8');
        existingNews = JSON.parse(data);
        console.log(`Loaded ${existingNews.length} existing news items.`);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.warn('Error reading existing news file:', error.message);
        }
    }

    const newItems = [];

    // Hardcoded distinct mock data for demo quality
    const MOCK_TECHNICAL_DATA = [
        {
            title: '基于数值模拟的注塑模具冷却系统优化设计',
            link: 'https://example.com/paper/opt-cooling',
            pubDate: new Date().toISOString(),
            contentSnippet: '摘要：本文利用Moldflow软件对某汽车内饰件注塑模具的冷却系统进行了数值模拟分析，提出了随形冷却水道的优化方案，有效缩短了成型周期。',
            guid: 'mock-tech-cooling-opt'
        },
        {
            title: '微孔发泡注塑成型工艺对PP材料力学性能的影响',
            link: 'https://example.com/paper/mucell-pp',
            pubDate: new Date(Date.now() - 86400000).toISOString(),
            contentSnippet: '摘要：研究了微孔发泡注塑工艺参数（注射速度、熔体温度、气体由于量）对聚丙烯（PP）材料拉伸强度和冲击强度的影响规律。',
            guid: 'mock-tech-mucell-pp'
        },
        {
            title: '精密注塑模具的零缺陷制造技术探讨',
            link: 'https://example.com/paper/zero-defect',
            pubDate: new Date(Date.now() - 2 * 86400000).toISOString(),
            contentSnippet: '摘要：针对精密电子连接器模具，探讨了从模具设计、加工加工到组装调试全过程的精度控制策略，旨在实现零缺陷制造。',
            guid: 'mock-tech-zero-defect'
        },
        {
            title: '生物可降解材料PLA的注塑成型工艺特性研究',
            link: 'https://example.com/paper/pla-injection',
            pubDate: new Date(Date.now() - 3 * 86400000).toISOString(),
            contentSnippet: '摘要：分析了聚乳酸（PLA）在注塑加工中的流变行为和结晶特性，优化了其成型工艺窗口，改善了制品的耐热性能。',
            guid: 'mock-tech-pla'
        },
        {
            title: '金属粉末注射成型（MIM）常见缺陷与对策',
            link: 'https://example.com/paper/mim-defects',
            pubDate: new Date(Date.now() - 4 * 86400000).toISOString(),
            contentSnippet: '摘要：总结了MIM工艺中常见的凹陷、变形、黑斑等缺陷产生的原因，并从喂料制备、注射、脱脂燒結等方面提出了解决方案。',
            guid: 'mock-tech-mim'
        },
        {
            title: '人工智能在注塑生产过程质量监控中的应用',
            link: 'https://example.com/paper/ai-monitoring',
            pubDate: new Date(Date.now() - 5 * 86400000).toISOString(),
            contentSnippet: '摘要：构建了基于机器学习的注塑过程质量预测模型，通过实时采集注塑机传感器数据，实现了对制品重量和尺寸精度的在线监控。',
            guid: 'mock-tech-ai'
        }
    ];

    const MOCK_INDUSTRY_DATA = [
        {
            title: '2025年中国注塑机行业市场规模与发展趋势报告',
            link: 'https://example.com/news/market-2025',
            pubDate: new Date().toISOString(),
            contentSnippet: '最新数据显示，随着新能源汽车和医疗器械行业的快速发展，中国精密注塑机市场需求持续增长，国产高端机型占比稳步提升。',
            guid: 'mock-ind-market-2025',
            image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' // Factory/Machine
        },
        {
            title: 'CHINAPLAS 2026 国际橡塑展定档上海，聚焦“绿色、智能、先进”',
            link: 'https://example.com/news/chinaplas-2026',
            pubDate: new Date(Date.now() - 86400000).toISOString(),
            contentSnippet: '作为亚洲最大的塑料橡胶工业展览会，CHINAPLAS 2026将重点展示生物塑料、回收再生技术以及数字化智能制造解决方案。',
            guid: 'mock-ind-chinaplas',
            image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80' // Exhibition/Conference
        },
        {
            title: '某知名车企发布一体化压铸/注塑新技术，引领轻量化变革',
            link: 'https://example.com/news/car-lightweight',
            pubDate: new Date(Date.now() - 2 * 86400000).toISOString(),
            contentSnippet: '该技术结合了大型一体化压铸与高强度工程塑料注塑，在保证车身结构强度的同时，显著降低了整车重量和制造成本。',
            guid: 'mock-ind-car-lightweight',
            image_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80' // Car/Automotive
        },
        {
            title: '欧盟通过新塑料包装法规，再生塑料使用比例要求提高',
            link: 'https://example.com/news/eu-regulation',
            pubDate: new Date(Date.now() - 3 * 86400000).toISOString(),
            contentSnippet: '欧盟最新法规要求，到2030年，所有进入欧盟市场的塑料包装必须包含至少30%的再生塑料成分，这对出口型注塑企业提出了新挑战。',
            guid: 'mock-ind-eu-reg',
            image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80' // Recycling/Green
        },
        {
            title: '新型耐高温特种工程塑料研发成功，可替代部分金属部件',
            link: 'https://example.com/news/new-material',
            pubDate: new Date(Date.now() - 4 * 86400000).toISOString(),
            contentSnippet: '国内某材料研究院成功开发出耐热温度超过300℃的新型聚酰亚胺材料，在航空航天和高端电子领域具有广阔的应用前景。',
            guid: 'mock-ind-material',
            image_url: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=600&q=80' // Lab/Science (Updated)
        },
        {
            title: '医疗耗材集中采购推动自动化注塑生产线升级',
            link: 'https://example.com/news/medical-automation',
            pubDate: new Date(Date.now() - 5 * 86400000).toISOString(),
            contentSnippet: '面对集采带来的成本压力，各大医疗耗材生产商纷纷引进全电动注塑机和自动化包装线，以提高生产效率和产品一致性。',
            guid: 'mock-ind-medical',
            image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80' // Medical/Lab
        }
    ];

    for (const source of SOURCES) {
        console.log(`Fetching ${source.name} (${source.url})...`);
        try {
            let items = [];

            if (source.url === 'MOCK_TECHNICAL_FEED') {
                console.log('Generating distinct mock technical papers...');
                items = MOCK_TECHNICAL_DATA;
            } else if (source.url === 'MOCK_INDUSTRY_FEED') {
                console.log('Generating distinct mock industry news...');
                items = MOCK_INDUSTRY_DATA;
            } else {
                const feed = await parser.parseURL(source.url);
                items = feed.items;
                console.log(`Refreshed ${source.name}: found ${items.length} items.`);
            }

            for (const item of items) {
                // For mock items, use our provided image_url
                const normalized = normalizeItem(item, source);
                if (item.image_url) {
                    normalized.image_url = item.image_url;
                }

                // For valid mock sources, we want to OVERWRITE existing items of this category to avoid duplicates
                // We will handle this in the merge step.
                newItems.push(normalized);
            }
        } catch (err) {
            console.error(`Failed to fetch ${source.name}:`, err.message);
        }
    }

    // Deduplicate and Merge
    // To fix "8 items" issue: If we have fresh content for a category, let's prioritize it
    // Strategy: 
    // 1. Keep 'existingNews' BUT filter out any items that belong to categories we just fetched (if we want a full refresh).
    //    Or better: Filter out items with the same IDs.
    // 2. Since we want a "clean" set of 6 for the demo, let's aggressively filter existing news.

    const fetchedCategories = new Set(SOURCES.map(s => s.category));

    // Filter out old items from the categories we are updating (to remove stale mocks or duplicates)
    // This ensures if we have 6 new 'industry' items, we remove ALL old 'industry' items.
    const keptExisting = existingNews.filter(item => !fetchedCategories.has(item.category));

    const allNews = [...keptExisting, ...newItems].sort((a, b) => {
        return new Date(b.published_at) - new Date(a.published_at);
    });

    // Limit total items (e.g., keep last 100) to keep file size small
    const trimmedNews = allNews.slice(0, 100);

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(trimmedNews, null, 2), 'utf-8');

    console.log(`Aggregation Complete. Total: ${trimmedNews.length}. Saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);
