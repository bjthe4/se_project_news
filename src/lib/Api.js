// src/lib/api.js
// Wrapper around NewsAPI's "everything" endpoint.
// - Exports `getNews(query, opts)` and default export.
// - Converts NewsAPI articles to internal app format.
// - If query is empty, returns [] (so UI won't fetch all news).
// - Uses `X-Api-Key` header if `VITE_NEWS_API_KEY` is set.

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
// Use proxy endpoint in production (nomoreparties) to avoid CORS,
// otherwise hit NewsAPI directly in dev.
const BASE_URL =
  import.meta.env.PROD === true || import.meta.env.PROD === 'true'
    ? 'https://nomoreparties.co/news/v2/everything'
    : 'https://newsapi.org/v2/everything';

/**
 * mapArticle(article, q)
 * Normalize raw NewsAPI article → app's "news item" shape
 * Ensures every item has an `id` and safe fallbacks.
 */
function mapArticle(article, q) {
  return {
    id: article.url || `${article.source?.id || 'src'}_${article.publishedAt || Date.now()}`,
    title: article.title || '',
    img: article.urlToImage || '',
    author: article.author || article.source?.name || 'Unknown',
    date: article.publishedAt ? article.publishedAt.split('T')[0] : '',
    desc: article.description || '',
    longerDesc: article.content || article.description || '',
    topic: q || '',
    url: article.url || ''
  };
}

/**
 * buildUrl(params)
 * Helper to build query string for NewsAPI endpoint.
 */
function buildUrl({ q, from, to, sortBy = 'publishedAt', pageSize = 100, language }) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  if (sortBy) params.set('sortBy', sortBy);
  if (pageSize) params.set('pageSize', String(pageSize));
  if (language) params.set('language', language);
  return `${BASE_URL}?${params.toString()}`;
}

/**
 * getNews(query, opts)
 * - query: string (empty → return [])
 * - opts: { daysBack = 7, sortBy, pageSize, language }
 * Handles:
 *   - building time window (from/to dates)
 *   - attaching API key in header
 *   - error handling for network and API errors
 *   - mapping results into app format
 */
export async function getNews(query, opts = {}) {
  const q = (query || '').trim();
  if (!q) return []; // avoid fetching "everything" if query is empty

  // Compute date window (defaults to last N days)
  const daysBack = Number(opts.daysBack ?? 7);
  const today = new Date();
  const fromDate = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const toDate = today.toISOString().split('T')[0];

  // Build API URL
  const url = buildUrl({
    q,
    from: fromDate,
    to: toDate,
    sortBy: opts.sortBy || 'publishedAt',
    pageSize: opts.pageSize || 100,
    language: opts.language || 'en'
  });

  const fetchOptions = { headers: {} };

  // Prefer header-based API key auth (per NewsAPI docs)
  if (API_KEY) {
    fetchOptions.headers['X-Api-Key'] = API_KEY;
  } else {
    // If no key is set, request will fail on NewsAPI side.
    // In dev, add VITE_NEWS_API_KEY in `.env`.
  }

  let res;
  try {
    res = await fetch(url, fetchOptions);
  } catch (err) {
    throw new Error('Network error while fetching news');
  }

  if (!res.ok) {
    // Try to read response body for more details
    let text = '';
    try {
      text = await res.text();
    } catch (_) {}
    // Common errors: 401 (bad key), 429 (rate limit)
    throw new Error(`NewsAPI error ${res.status}: ${text || res.statusText}`);
  }

  const payload = await res.json();

  // Validate payload
  if (!payload || payload.status !== 'ok' || !Array.isArray(payload.articles)) {
    throw new Error('Unexpected response from NewsAPI');
  }

  // Normalize each article into app's shape
  return payload.articles.map((a) => mapArticle(a, q));
}

export default getNews;
