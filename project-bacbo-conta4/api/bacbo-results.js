import { fetchBacBoResults } from '../lib/scraper.js';

export async function GET() {
  const results = await fetchBacBoResults();

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
}
