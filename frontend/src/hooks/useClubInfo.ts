import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Club } from "@/types/clubInfo";

const API_URL = import.meta.env.VITE_API_URL;

const useClubInfo = (tags: string[]) => {
  const [clubInfos, setClubInfos] = useState<Record<string, Club | null>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchClubInfo = async (tag: string) => {
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
    };

    tags.forEach((tag) => {
      if (!clubInfos[tag] && !loading[tag] && !errors[tag]) {
        fetchClubInfo(tag);
      }
    });
  }, [tags, clubInfos, loading, errors]);

  return { clubInfos, loading, errors };
};

export default useClubInfo;
