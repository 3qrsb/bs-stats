import { useSearchParams } from "react-router-dom";
import {
  Box,
  Spinner,
  Table,
  Heading,
  Image,
  Text,
  createListCollection,
  Stack,
} from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { argbToRgba, parseClubName } from "@/utils/colorUtils";
import { formatTrophies } from "@/utils/formatTrophies";
import usePlayerLeaderboard from "@/hooks/usePlayerLeaderboard";
import useCountries from "@/hooks/useCountries";

const PlayerLeaderboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get("country") || "global";

  const {
    leaderboard,
    loading: leaderboardLoading,
    error,
  } = usePlayerLeaderboard(country);
  const {
    countries,
    loading: countriesLoading,
    error: countriesError,
  } = useCountries();

  const handleCountryChange = (details: { value: string[] }) => {
    if (details.value.length > 0) {
      setSearchParams({ country: details.value[0] });
    } else {
      setSearchParams({ country: "global" });
    }
  };

  const countryCollection = createListCollection({
    items: countries.map(({ label, value }) => ({ label, value })),
  });

  const selectedCountry = countries.find((c) => c.value === country);

  if (countriesLoading || leaderboardLoading) {
    return <Spinner size="xl" mt="8" />;
  }

  if (countriesError || error) {
    return (
      <Box color="red.500" mt="8">
        {countriesError || error}
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Heading mb={6} fontSize={{ base: "2xl", md: "3xl" }} textAlign="center">
        Player Leaderboard
      </Heading>

      <Box mb={3} display="flex" justifyContent="center">
        <SelectRoot
          collection={countryCollection}
          value={[country]}
          onValueChange={handleCountryChange}
          mb={4}
          size="md"
          width={{ base: "100%", sm: "250px" }}
        >
          <SelectTrigger>
            <Stack direction="row" align="center" flex="1">
              {selectedCountry?.flag && (
                <Image
                  src={selectedCountry.flag}
                  alt={selectedCountry.label}
                  width="24px"
                  height="18px"
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
                      width="24px"
                      height="18px"
                    />
                  )}
                  <Text>{country.label}</Text>
                </Stack>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Box>

      <Table.Root mb={3}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Rank</Table.ColumnHeader>
            <Table.ColumnHeader>Player</Table.ColumnHeader>
            <Table.ColumnHeader>Club</Table.ColumnHeader>
            <Table.ColumnHeader>Trophies</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {leaderboard.map((player, index) => (
            <Table.Row key={index}>
              <Table.Cell>{player.rank}</Table.Cell>
              <Table.Cell>
                <Stack direction="row" align="center" gap={3}>
                  <Text color={argbToRgba(player.nameColor)}>
                    {player.name}
                  </Text>
                </Stack>
              </Table.Cell>
              <Table.Cell>
                {player.club ? (
                  (() => {
                    const { name, color } = parseClubName(player.club.name);
                    return <Text color={color}>{name}</Text>;
                  })()
                ) : (
                  <Text>-</Text>
                )}
              </Table.Cell>
              <Table.Cell>{formatTrophies(player.trophies)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default PlayerLeaderboardPage;
