import { useState, useEffect } from "react";
import axios from "axios";
import { ClubRanking } from "@/types/clubInfo";
import useClubIcons from "../BrawlApiIcons/useClubIcons";

const useClubLeaderboard = (country: string) => {
  const [leaderboard, setLeaderboard] = useState<ClubRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    clubIcons,
    loading: iconsLoading,
    error: iconsError,
  } = useClubIcons();

  useEffect(() => {
    const fetchClubLeaderboard = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get<{ items: ClubRanking[] }>(
          `http://localhost:3000/leaderboard/clubs?country=${country}`
        );

        const clubs = response.data.items;

        const enrichedClubs = clubs.map((club) => ({
          ...club,
          badgeUrl: clubIcons[club.badgeId] || undefined,
        }));

        setLeaderboard(enrichedClubs);
      } catch (err) {
        setError(`Failed to fetch club leaderboard: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (!iconsLoading) {
      fetchClubLeaderboard();
    }
  }, [country, clubIcons, iconsLoading]);

  return {
    leaderboard,
    loading: loading || iconsLoading,
    error: error || iconsError,
  };
};

export default useClubLeaderboard;
