// Build-time news aggregator for the Tech News / Industry News sections.
//
// Pulls current Chinese injection-molding / plastics-industry headlines from
// Google News RSS search and writes them to ../public/data/news.json.
//
// It stores ONLY: title + (short summary if the source provides one) + source
// name + original link. It never republishes full article text — cards link
// out to the source.
//
// Run locally:   node frontend/scripts/fetch-news.mjs
// Run in CI:     see .github/workflows/fetch-news.yml
//
// Swapping sources: edit FEEDS / FEED_URL below. Any RSS/Atom URL works. Note
// Google News RSS is licensed for personal/non-commercial feed-reader use — for
// a commercial site prefer publisher feeds that permit syndication, or a
// licensed news API (those also tend to provide real article summaries, which
// Google News does not).

import Parser from 'rss-parser'
import { writeFile } from 'node:fs/promises'

const OUT_URL = new URL('../public/data/news.json', import.meta.url)
const PER_CATEGORY = 8
const MAX_PER_SOURCE = 2
const SUMMARY_MAX = 150

// Topic queries mapped to the site's two categories.
const FEEDS = [
  { category: 'industry', query: '注塑机 行业' },
  { category: 'industry', query: '塑料机械 产业' },
  { category: 'industry', query: '橡塑 注塑 市场' },
  { category: 'technical', query: '注塑 工艺' },
  { category: 'technical', query: '工程塑料 材料' },
  { category: 'technical', query: '注塑 模具 技术' },
]

// Drop obvious SEO/listicle/advertorial spam that these niche queries surface.
const SPAM = /(选购指南|价格透明|口碑|厂家排名|哪家好|多少钱|报价|怎么样|十大品牌|加盟|招商|供应商推荐)/

const FEED_URL = (q) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`

const parser = new Parser({
  timeout: 20000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KuixingNewsBot/1.0)' },
})

function stripHtml(s = '') {
  return s
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#3[49];/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

const truncate = (s, n) => (s.length <= n ? s : s.slice(0, n).trimEnd() + '…')

// Google News titles read "Headline - Publisher"; split the publisher off.
function splitTitleSource(rawTitle, fallback) {
  const idx = rawTitle.lastIndexOf(' - ')
  if (idx > 0 && rawTitle.length - idx <= 40) {
    return { title: rawTitle.slice(0, idx).trim(), source: rawTitle.slice(idx + 3).trim() }
  }
  return { title: rawTitle.trim(), source: fallback }
}

// Google News snippets are just "Title Source" with no real abstract; strip the
// redundant parts and keep only a genuine summary if one is present.
function cleanSummary(snippet, title, source) {
  let s = stripHtml(snippet)
  if (s.startsWith(title)) s = s.slice(title.length).trim()
  if (source && s.endsWith(source)) s = s.slice(0, s.length - source.length).trim()
  return s.length >= 16 ? truncate(s, SUMMARY_MAX) : ''
}

const normalizeTitle = (t) =>
  t.replace(/\s+/g, '').replace(/[【】[\]「」“”"'’，,。.!！?？:：、\-—|/]/g, '').toLowerCase()

function idFromUrl(url) {
  let h = 0
  for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) >>> 0
  return 'rss-' + h.toString(36)
}

async function fetchFeed({ category, query }) {
  try {
    const feed = await parser.parseURL(FEED_URL(query))
    return (feed.items || []).map((item) => {
      const { title, source } = splitTitleSource(item.title || '', item.source?.title || 'Google 新闻')
      const publishedAt = item.isoDate || (item.pubDate ? new Date(item.pubDate).toISOString() : null)
      return {
        id: idFromUrl(item.link || title),
        title,
        summary: cleanSummary(item.contentSnippet || item.content || '', title, source),
        content: null,
        url: item.link || '',
        published_at: publishedAt || new Date().toISOString(),
        source_name: source,
        category,
        image_url: null,
        created_at: new Date().toISOString(),
      }
    })
  } catch (err) {
    console.error(`feed failed [${category}] "${query}": ${err.message}`)
    return []
  }
}

// Rank newest-first, dropping spam, duplicate titles (shared across categories),
// and capping how many items any single source contributes.
function rank(items, limit, seenTitles) {
  const perSource = {}
  const out = []
  for (const it of [...items].sort((a, b) => b.published_at.localeCompare(a.published_at))) {
    if (!it.url || !it.title || SPAM.test(it.title)) continue
    const key = normalizeTitle(it.title)
    if (seenTitles.has(key)) continue
    const count = perSource[it.source_name] || 0
    if (count >= MAX_PER_SOURCE) continue
    seenTitles.add(key)
    perSource[it.source_name] = count + 1
    out.push(it)
    if (out.length >= limit) break
  }
  return out
}

async function main() {
  const all = (await Promise.all(FEEDS.map(fetchFeed))).flat()
  const seenTitles = new Set()
  const industry = rank(all.filter((i) => i.category === 'industry'), PER_CATEGORY, seenTitles)
  const technical = rank(all.filter((i) => i.category === 'technical'), PER_CATEGORY, seenTitles)
  const merged = [...industry, ...technical].sort((a, b) =>
    b.published_at.localeCompare(a.published_at)
  )

  if (merged.length === 0) {
    console.error('No items fetched — keeping existing news.json unchanged.')
    return
  }

  await writeFile(OUT_URL, JSON.stringify(merged, null, 2) + '\n', 'utf8')
  console.log(
    `Wrote ${merged.length} items (${industry.length} industry, ${technical.length} technical).`
  )
}

main()
