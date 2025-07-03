let history = [];

export async function GET() {
  const lastResults = history.slice(-10);

  let stats = { Player: 0, Dealer: 0, Tie: 0 };
  for (const result of lastResults) {
    stats[result.winner]++;
  }

  return new Response(JSON.stringify({
    lastResults,
    stats,
    totalGames: history.length,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    history.push(body);
    if (history.length > 100) history.shift();
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
