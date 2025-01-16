import { useState, useEffect } from "react";
import axios from "axios";
import { PlayerInfo } from "@/types/PlayerInfo";

const usePlayerInfo = (tag: string) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const response = await axios.get<PlayerInfo>(
          `http://localhost:3000/brawl-stars/players/${tag}`
        );
        setPlayerInfo(response.data);
      } catch (err) {
        setError(`Failed to fetch player information: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (tag) {
      fetchPlayerInfo();
    }
  }, [tag]);

  return { playerInfo, loading, error };
};

export default usePlayerInfo;
