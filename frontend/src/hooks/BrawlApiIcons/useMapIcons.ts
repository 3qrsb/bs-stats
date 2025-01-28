import { useState, useEffect } from "react";
import axios from "axios";

interface Map {
  id: number;
  name: string;
  imageUrl: string;
}

const useMapIcons = () => {
  const [mapIcons, setMapIcons] = useState<
    Record<number, { name: string; imageUrl: string }>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMapIcons = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ list: Map[] }>(
          "https://api.brawlify.com/v1/maps"
        );

        const mapIconMap = Object.fromEntries(
          response.data.list.map((map) => [
            map.id,
            { name: map.name, imageUrl: map.imageUrl },
          ])
        );

        setMapIcons(mapIconMap);
      } catch (err) {
        setError(`Failed to fetch map icons: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMapIcons();
  }, []);

  return { mapIcons, loading, error };
};

export default useMapIcons;
