import { fetchBacBoResults } from '../lib/scraper.js';

function calcularEstatisticas(results) {
  let stats = { Player: 0, Dealer: 0, Tie: 0 };
  let maxStreaks = { Player: 0, Dealer: 0, Tie: 0 };
  let currentStreak = { type: null, count: 0 };

  for (const result of results) {
    const winner = result.winner;

    // Contagem simples
    if (stats[winner] !== undefined) {
      stats[winner]++;
    }

    // Streak atual
    if (winner === currentStreak.type) {
      currentStreak.count++;
    } else {
      if (currentStreak.type && currentStreak.count > maxStreaks[currentStreak.type]) {
        maxStreaks[currentStreak.type] = currentStreak.count;
      }
      currentStreak.type = winner;
      currentStreak.count = 1;
    }
  }

  // Checar a última streak
  if (currentStreak.type && currentStreak.count > maxStreaks[currentStreak.type]) {
    maxStreaks[currentStreak.type] = currentStreak.count;
  }

  const total = results.length;
  const percentuais = {
    Player: ((stats.Player / total) * 100).toFixed(1) + '%',
    Dealer: ((stats.Dealer / total) * 100).toFixed(1) + '%',
    Tie: ((stats.Tie / total) * 100).toFixed(1) + '%',
  };

  return {
    totalGames: total,
    stats,
    percentuais,
    maxStreaks,
    currentStreak: {
      type: currentStreak.type,
      count: currentStreak.count,
    },
  };
}

export async function GET() {
  const allResults = await fetchBacBoResults();
  const last50 = allResults.slice(0, 50); // Pega os últimos 50 jogos

  const estatisticas = calcularEstatisticas(last50);

  return new Response(JSON.stringify(estatisticas), {
    headers: { 'Content-Type': 'application/json' },
  });
}

