import { useState, useEffect } from "react";
import axios from "axios";

interface ClubIcon {
  id: number;
  imageUrl: string;
}

const useClubIcons = () => {
  const [clubIcons, setClubIcons] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClubIcons = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ club: Record<string, ClubIcon> }>(
          "https://api.brawlify.com/v1/icons"
        );

        const clubIconMap = Object.fromEntries(
          Object.values(response.data.club).map((icon) => [
            icon.id,
            icon.imageUrl,
          ])
        );

        setClubIcons(clubIconMap);
      } catch (err) {
        setError(`Failed to fetch club icons: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClubIcons();
  }, []);

  return { clubIcons, loading, error };
};

export default useClubIcons;
