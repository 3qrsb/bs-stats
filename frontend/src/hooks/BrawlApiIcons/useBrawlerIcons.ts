import { useState, useEffect } from "react";
import axios from "axios";

interface Brawler {
  id: number;
  name: string;
  imageUrl: string;
}

const useBrawlerIcons = () => {
  const [brawlerIcons, setBrawlerIcons] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrawlerIcons = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ list: Brawler[] }>(
          "https://api.brawlify.com/v1/brawlers"
        );

        const brawlerIconMap = Object.fromEntries(
          response.data.list.map((brawler) => [brawler.id, brawler.imageUrl])
        );

        setBrawlerIcons(brawlerIconMap);
      } catch (err) {
        setError(`Failed to fetch brawler icons: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBrawlerIcons();
  }, []);

  return { brawlerIcons, loading, error };
};

export default useBrawlerIcons;
