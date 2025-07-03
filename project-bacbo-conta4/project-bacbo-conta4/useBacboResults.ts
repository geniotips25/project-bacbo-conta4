import { useEffect, useState } from "react";
import axios from "axios";

interface BacboResult {
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
        if (data.results) {
          setResults(data.results.slice(0, 50)); // pega os últimos 50
        }
      } catch (error) {
        console.error("Erro ao buscar resultados do BacBo:", error);
      }
    };

    fetchResults();
    const interval = setInterval(fetchResults, 8000);
    return () => clearInterval(interval);
  }, []);

  return results;
}
