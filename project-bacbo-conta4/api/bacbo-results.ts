import { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://www.tipminer.com/br/historico/jonbet/bac-bo');

    const results = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      return rows.map(row => {
        const tds = row.querySelectorAll("td");
        const player = parseInt(tds[1]?.textContent?.trim() || "0");
        const banker = parseInt(tds[2]?.textContent?.trim() || "0");
        const winnerText = tds[3]?.textContent?.trim().toLowerCase() || "";
        let winner = "Empate";
        if (winnerText.includes("player")) winner = "Player";
        else if (winnerText.includes("banker")) winner = "Banker";
        return { player, banker, winner };
      });
    });

    await browser.close();
    res.status(200).json({ results });
  } catch (err) {
    console.error("Erro no Puppeteer:", err);
    res.status(500).json({ error: "Erro ao capturar resultados" });
  }
}
