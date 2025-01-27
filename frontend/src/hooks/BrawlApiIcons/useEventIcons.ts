import { useState, useEffect } from "react";
import axios from "axios";

interface Event {
  id: number;
  name: string;
  map: string;
  imageUrl: string;
}

const useEventIcons = () => {
  const [eventIcons, setEventIcons] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventIcons = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ list: Event[] }>(
          "https://api.brawlify.com/v1/events"
        );

        const eventIconMap = Object.fromEntries(
          response.data.list.map((event) => [event.id, event.imageUrl])
        );

        setEventIcons(eventIconMap);
      } catch (err) {
        setError(`Failed to fetch event icons: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEventIcons();
  }, []);

  return { eventIcons, loading, error };
};

export default useEventIcons;
