import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PlayerRanking } from "@/types/playerInfo";
import usePlayerIcons from "../BrawlApiIcons/usePlayerIcons";

const API_URL = import.meta.env.VITE_API_URL;

const usePlayerLeaderboard = (country: string) => {
  const [leaderboard, setLeaderboard] = useState<PlayerRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    playerIcons,
    loading: iconsLoading,
    error: iconsError,
  } = usePlayerIcons();

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get<{ items: PlayerRanking[] }>(
        `${API_URL}/leaderboard/players?country=${country}`
      );
      const players = response.data.items;
      const enrichedPlayers = players.map((player) => ({
        ...player,
        icon: {
          ...player.icon,
          url: playerIcons[player.icon.id] || undefined,
        },
      }));
      setLeaderboard(enrichedPlayers);
    } catch (err) {
      setError(`Failed to fetch leaderboard: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [country, playerIcons]);

  useEffect(() => {
    if (!iconsLoading) {
      fetchLeaderboard();
    }
  }, [fetchLeaderboard, iconsLoading]);

  return {
    leaderboard,
    loading: loading || iconsLoading,
    error: error || iconsError,
    refetch: fetchLeaderboard,
  };
};

export default usePlayerLeaderboard;
