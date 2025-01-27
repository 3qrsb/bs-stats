import { useState, useEffect } from "react";
import axios from "axios";

interface PlayerIcon {
  id: number;
  imageUrl: string;
}

const usePlayerIcons = () => {
  const [playerIcons, setPlayerIcons] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayerIcons = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{
          player: Record<string, PlayerIcon>;
        }>("https://api.brawlify.com/v1/icons");

        const playerIconMap = Object.fromEntries(
          Object.values(response.data.player).map((icon) => [
            icon.id,
            icon.imageUrl,
          ])
        );

        setPlayerIcons(playerIconMap);
      } catch (err) {
        setError(`Failed to fetch player icons: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerIcons();
  }, []);

  return { playerIcons, loading, error };
};

export default usePlayerIcons;
