import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ClubRanking } from "@/types/clubInfo";
import useClubIcons from "../BrawlApiIcons/useClubIcons";

const API_URL = import.meta.env.VITE_API_URL;

const useClubLeaderboard = (country: string) => {
  const [leaderboard, setLeaderboard] = useState<ClubRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    clubIcons,
    loading: iconsLoading,
    error: iconsError,
  } = useClubIcons();

  const fetchClubLeaderboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get<{ items: ClubRanking[] }>(
        `${API_URL}/leaderboard/clubs?country=${country}`
      );

      const clubs = response.data.items;

      const enrichedClubs = clubs.map((club) => ({
        ...club,
        badgeUrl: clubIcons[club.badgeId] || undefined,
      }));

      setLeaderboard(enrichedClubs);
      setError("");
    } catch (err) {
      setError(`Failed to fetch club leaderboard: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [country, clubIcons]);

  useEffect(() => {
    if (!iconsLoading) {
      fetchClubLeaderboard();
    }
  }, [fetchClubLeaderboard, iconsLoading]);

  return {
    leaderboard,
    loading: loading || iconsLoading,
    error: error || iconsError,
    refetch: fetchClubLeaderboard,
  };
};

export default useClubLeaderboard;
