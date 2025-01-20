import { useState, useEffect } from "react";
import axios from "axios";
import { BrawlAPIPlayerIcon } from "@/types/playerInfo";

interface BrawlAPIIconsResponse {
  player: Record<string, BrawlAPIPlayerIcon>;
  club: Record<string, { id: number; imageUrl: string }>;
}

const useBrawlIcons = () => {
  const [playerIcons, setPlayerIcons] = useState<Record<number, string>>({});
  const [clubIcons, setClubIcons] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIcons = async () => {
      setLoading(true);
      try {
        const response = await axios.get<BrawlAPIIconsResponse>(
          `https://api.brawlify.com/v1/icons`
        );

        const playerIconMap: Record<number, string> = {};
        Object.values(response.data.player).forEach((icon) => {
          playerIconMap[icon.id] = icon.imageUrl;
        });

        const clubIconMap: Record<number, string> = {};
        Object.values(response.data.club).forEach((club) => {
          clubIconMap[club.id] = club.imageUrl;
        });

        setPlayerIcons(playerIconMap);
        setClubIcons(clubIconMap);
      } catch (err) {
        setError(`Failed to fetch icons: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  return { playerIcons, clubIcons, loading, error };
};

export default useBrawlIcons;
