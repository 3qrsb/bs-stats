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

const countries = createListCollection({
  items: [
    { label: "Global", value: "global" },
    { label: "United States", value: "us" },
    { label: "Germany", value: "de" },
    { label: "Kazakhstan", value: "kz" },
  ],
});

const PlayerLeaderboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get("country") || "global";

  const { leaderboard, loading, error } = usePlayerLeaderboard(country);

  const handleCountryChange = (details: { value: string[] }) => {
    if (details.value.length > 0) {
      setSearchParams({ country: details.value[0] });
    }
  };

  if (loading) {
    return <Spinner size="xl" mt="8" />;
  }

  if (error) {
    return (
      <Box color="red.500" mt="8">
        {error}
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
          collection={countries}
          defaultValue={["global"]}
          onValueChange={handleCountryChange}
          mb={4}
          size="md"
          width={{ base: "100%", sm: "200px" }}
        >
          <SelectTrigger clearable>
            <SelectValueText placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.items.map((country) => (
              <SelectItem item={country} key={country.value}>
                {country.label}
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
                  <Image src={player.icon.id} boxSize="24px" />
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
