import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Club } from "@/types/clubInfo";

const API_URL = import.meta.env.VITE_API_URL;

const useClubInfo = (tags: string[]) => {
  const [clubInfos, setClubInfos] = useState<Record<string, Club | null>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchClubInfo = useCallback(async (tag: string) => {
    setLoading((prev) => ({ ...prev, [tag]: true }));
    setErrors((prev) => ({ ...prev, [tag]: "" }));

    try {
      const response = await axios.get<Club>(`${API_URL}/club/${tag}`);
      setClubInfos((prev) => ({ ...prev, [tag]: response.data }));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setErrors((prev) => ({
        ...prev,
        [tag]: `Failed to fetch club information: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [tag]: false }));
    }
  }, []);

  useEffect(() => {
    tags.forEach((tag) => {
      if (!clubInfos[tag] && !loading[tag] && !errors[tag]) {
        fetchClubInfo(tag);
      }
    });
  }, [tags, clubInfos, loading, errors, fetchClubInfo]);

  const refetch = useCallback(() => {
    tags.forEach((tag) => fetchClubInfo(tag));
  }, [tags, fetchClubInfo]);

  return { clubInfos, loading, errors, refetch };
};

export const validateClubTag = async (tag: string): Promise<boolean> => {
  try {
    const response = await axios.get<{ valid: boolean }>(
      `${API_URL}/club/validate/${encodeURIComponent(tag)}`
    );
    return response.data.valid;
  } catch {
    return false;
  }
};

export default useClubInfo;
