import { useState, useEffect } from "react";
import axios from "axios";
import { PlayerInfo } from "@/types/playerInfo";

const usePlayerInfo = (tags: string[]) => {
  const [playerInfos, setPlayerInfos] = useState<
    Record<string, PlayerInfo | null>
  >({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPlayerInfo = async (tag: string) => {
      setLoading((prev) => ({ ...prev, [tag]: true }));
      setErrors((prev) => ({ ...prev, [tag]: "" }));

      try {
        const response = await axios.get<PlayerInfo>(
          `http://localhost:3000/brawl-stars/players/${tag}`
        );
        setPlayerInfos((prev) => ({ ...prev, [tag]: response.data }));
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          [tag]: `Failed to fetch player information: ${err}`,
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [tag]: false }));
      }
    };

    tags.forEach((tag) => {
      if (!playerInfos[tag] && !loading[tag] && !errors[tag]) {
        fetchPlayerInfo(tag);
      }
    });
  }, [tags, playerInfos, loading, errors]);

  return { playerInfos, loading, errors };
};

export default usePlayerInfo;
