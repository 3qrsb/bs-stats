import { useState, useEffect } from "react";
import axios from "axios";
import { PlayerRanking } from "@/types/playerInfo";
import usePlayerIcons from "./BrawlApiIcons/usePlayerIcons";

const usePlayerLeaderboard = (country: string) => {
  const [leaderboard, setLeaderboard] = useState<PlayerRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    playerIcons,
    loading: iconsLoading,
    error: iconsError,
  } = usePlayerIcons();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get<{ items: PlayerRanking[] }>(
          `http://localhost:3000/leaderboard/players?country=${country}`
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
    };

    if (!iconsLoading) {
      fetchLeaderboard();
    }
  }, [country, playerIcons, iconsLoading]);

  return {
    leaderboard,
    loading: loading || iconsLoading,
    error: error || iconsError,
  };
};

export default usePlayerLeaderboard;
