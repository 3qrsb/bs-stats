import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Player } from "@/types/playerInfo";

const usePlayerInfo = (tags: string[]) => {
  const [playerInfos, setPlayerInfos] = useState<Record<string, Player | null>>(
    {}
  );
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPlayerInfo = async (tag: string) => {
      setLoading((prev) => ({ ...prev, [tag]: true }));
      setErrors((prev) => ({ ...prev, [tag]: "" }));

      try {
        const response = await axios.get<Player>(
          `http://localhost:3000/brawl-stars/players/${tag}`
        );
        setPlayerInfos((prev) => ({ ...prev, [tag]: response.data }));
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        setErrors((prev) => ({
          ...prev,
          [tag]: `Failed to fetch player information: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`,
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
