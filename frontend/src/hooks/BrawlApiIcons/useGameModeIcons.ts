import { useState, useEffect } from "react";
import axios from "axios";

interface GameMode {
  id: number;
  name: string;
  imageUrl: string;
}

const useGameModeIcons = () => {
  const [gameModeIcons, setGameModeIcons] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGameModeIcons = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ list: GameMode[] }>(
          "https://api.brawlify.com/v1/gamemodes"
        );

        const gameModeIconMap = Object.fromEntries(
          response.data.list.map((mode) => [mode.name, mode.imageUrl])
        );

        setGameModeIcons(gameModeIconMap);
      } catch (err) {
        setError(`Failed to fetch game mode icons: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGameModeIcons();
  }, []);

  return { gameModeIcons, loading, error };
};

export default useGameModeIcons;
