import React from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { Country } from "@/hooks/useCountries";

interface CountrySelectProps {
  countries: Country[];
  selectedCountry: Country | undefined;
  value: string;
  onChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  countries,
  selectedCountry,
  value,
  onChange,
}) => {
  const handleCountryChange = (details: { value: string[] }) => {
    if (details.value && details.value.length > 0) {
      onChange(details.value[0]);
    }
  };

  const countryCollection = createListCollection({
    items: countries.map(({ label, value }) => ({ label, value })),
  });

  return (
    <Box mb={3} display="flex" justifyContent="center">
      <SelectRoot
        collection={countryCollection}
        value={[value]}
        onValueChange={handleCountryChange}
        mb={4}
        size="md"
        maxWidth={{ base: "100%", sm: "250px" }}
      >
        <SelectTrigger>
          <Stack direction="row" align="center" flex="1">
            {selectedCountry?.flag && (
              <Image
                src={selectedCountry.flag}
                alt={selectedCountry.label}
                width="16px"
                height="12px"
              />
            )}
            <SelectValueText placeholder="Select location" />
          </Stack>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem
              item={{ label: country.label, value: country.value }}
              key={country.value}
            >
              <Stack direction="row" align="center" gap={2}>
                {country.flag && (
                  <Image
                    src={country.flag}
                    alt={country.label}
                    width="16px"
                    height="12px"
                  />
                )}
                <Text>{country.label}</Text>
              </Stack>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
};

export default CountrySelect;
