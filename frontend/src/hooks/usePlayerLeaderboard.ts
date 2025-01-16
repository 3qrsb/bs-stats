import { useState, useEffect } from "react";
import axios from "axios";
import { PlayerRanking } from "@/types/PlayerInfo";

const useLeaderboard = (country: string) => {
  const [leaderboard, setLeaderboard] = useState<PlayerRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get<{ items: PlayerRanking[] }>(
          `http://localhost:3000/leaderboard/players?country=${country}`
        );
        setLeaderboard(response.data.items);
      } catch (err) {
        setError(`Failed to fetch leaderboard: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [country]);

  return { leaderboard, loading, error };
};

export default useLeaderboard;
