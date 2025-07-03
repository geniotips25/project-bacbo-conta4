import { useEffect, useState } from "react";
import axios from "axios";

export interface BacboResult {
  player: number;
  banker: number;
  winner: "Player" | "Banker" | "Empate";
}

export function useBacboResults(): BacboResult[] {
  const [results, setResults] = useState<BacboResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get("/api/bacbo-results");
        setResults(data.results || []);
      } catch (err) {
        console.error("Erro ao buscar resultados:", err);
      }
    };

    fetchResults();
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  return results;
}
