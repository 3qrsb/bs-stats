import { useEffect, useState } from "react";

export interface Country {
  label: string;
  value: string;
  flag: string;
}

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://flagcdn.com/en/codes.json");
        const data: Record<string, string> = await response.json();

        const countryList: Country[] = [
          { label: "🌍 Global", value: "global", flag: "" },
          ...Object.entries(data).map(([code, name]) => ({
            label: name,
            value: code,
            flag: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
          })),
        ];

        setCountries(countryList);
      } catch (err) {
        setError(`Failed to fetch countries: ${err}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useCountries;
