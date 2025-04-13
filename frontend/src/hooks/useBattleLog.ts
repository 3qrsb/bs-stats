import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Brawler {
  id: number;
  name: string;
  power: number;
  trophies: number;
}

interface BattlePlayer {
  tag: string;
  name: string;
  brawler: Brawler;
}

interface BattleEvent {
  id: number;
  mode: string;
  map: string;
}

interface BattleInfo {
  mode: string;
  type: string;
  result?: string;
  duration: number;
  trophyChange?: number;
  starPlayer?: BattlePlayer;
  teams: BattlePlayer[][];
}

export interface BattleLogEntry {
  battleTime: string;
  event: BattleEvent;
  battle: BattleInfo;
}

const useBattleLog = (playerTag: string) => {
  const [battleLog, setBattleLog] = useState<BattleLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBattleLog = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get<{ items: BattleLogEntry[] }>(
        `${API_URL}/battlelog/${playerTag}`
      );
      setBattleLog(response.data?.items || []);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(
        `Failed to fetch battle log: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [playerTag]);

  useEffect(() => {
    if (playerTag) {
      fetchBattleLog();
    }
  }, [playerTag, fetchBattleLog]);

  return { battleLog, loading, error, refetch: fetchBattleLog };
};

export default useBattleLog;
