import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Player } from "@/types/playerInfo";

const API_URL = import.meta.env.VITE_API_URL;

const usePlayerInfo = (tags: string[]) => {
  const [playerInfos, setPlayerInfos] = useState<Record<string, Player | null>>(
    {}
  );
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchPlayerInfo = useCallback(async (tag: string) => {
    setLoading((prev) => ({ ...prev, [tag]: true }));
    setErrors((prev) => ({ ...prev, [tag]: "" }));

    try {
      const response = await axios.get<Player>(`${API_URL}/player/${tag}`);
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
  }, []);

  useEffect(() => {
    tags.forEach((tag) => {
      if (!playerInfos[tag] && !loading[tag] && !errors[tag]) {
        fetchPlayerInfo(tag);
      }
    });
  }, [tags, playerInfos, loading, errors, fetchPlayerInfo]);

  const refetch = useCallback(() => {
    tags.forEach((tag) => fetchPlayerInfo(tag));
  }, [tags, fetchPlayerInfo]);

  return { playerInfos, loading, errors, refetch };
};

export const validatePlayerTag = async (tag: string): Promise<boolean> => {
  try {
    const response = await axios.get<{ valid: boolean }>(
      `${API_URL}/player/validate/${encodeURIComponent(tag)}`
    );
    return response.data.valid;
  } catch {
    return false;
  }
};

export default usePlayerInfo;
