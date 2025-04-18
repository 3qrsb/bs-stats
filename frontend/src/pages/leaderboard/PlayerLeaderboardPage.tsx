import { useSearchParams } from "react-router-dom";
import {
  Box,
  Spinner,
  Table,
  Heading,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Tag } from "@/components/ui/tag";
import { toaster } from "@/components/ui/toaster";
import CountrySelect from "@/components/CountrySelect";
import ErrorState from "@/components/ErrorState";
import LazyImage from "@/components/LazyImage";
import SEO from "@/components/SEO";
import usePlayerLeaderboard from "@/hooks/leaderboard/usePlayerLeaderboard";
import useCountries, { Country } from "@/hooks/useCountries";
import { argbToRgba, parseClubName } from "@/utils/colorUtils";
import { formatTrophies } from "@/utils/formatTrophies";
import { refetchAll } from "@/utils/refetchAll";

const PlayerLeaderboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const countryParam = searchParams.get("country");
  const country =
    countryParam && countryParam !== "global" ? countryParam : "global";

  const {
    leaderboard,
    loading: leaderboardLoading,
    error,
    refetch: refetchLeaderboard,
  } = usePlayerLeaderboard(country);

  const {
    countries,
    loading: countriesLoading,
    error: countriesError,
    refetch: refetchCountries,
  } = useCountries();

  const handleCountryChange = (newCountry: string) => {
    setSearchParams({ country: newCountry });
  };

  const selectedCountry = countries.find((c: Country) => c.value === country);
  const errorMessage = countriesError || error;
  const handleRetry = () => {
    refetchAll(refetchLeaderboard, refetchCountries);
  };

  if (countriesLoading || leaderboardLoading) {
    return (
      <Box textAlign="center" mt="8">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} onRetry={handleRetry} />;
  }

  return (
    <>
      <SEO
        title={`Brawl Stars Player Leaderboard - ${
          country === "global" ? "Global" : country.toUpperCase()
        }`}
        description={`View the top players in Brawl Stars in ${
          country === "global" ? "global" : country.toUpperCase()
        } rankings. Track trophy progression and more.`}
      />

      <Box
        p={{ base: 2, md: 8 }}
        maxW={{ base: "100%", md: "1100px" }}
        mx="auto"
      >
        <Heading
          mb={6}
          fontSize={{ base: "2xl", md: "3xl" }}
          textAlign="center"
        >
          Player Leaderboard
        </Heading>
        <CountrySelect
          countries={countries}
          selectedCountry={selectedCountry}
          value={country}
          onChange={handleCountryChange}
        />
        <Table.ScrollArea
          borderWidth="1px"
          rounded="md"
          maxW="100%"
          overflowX="auto"
        >
          <Table.Root mb={3} size="lg" interactive colorPalette="accent">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader minW="50px" scope="col" textAlign="start">
                  Rank
                </Table.ColumnHeader>
                <Table.ColumnHeader minW="250px" scope="col">
                  Player
                </Table.ColumnHeader>
                <Table.ColumnHeader minW="250px" scope="col">
                  Club
                </Table.ColumnHeader>
                <Table.ColumnHeader minW="100px" scope="col" textAlign="end">
                  Trophies
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {leaderboard.map((player, index) => (
                <Table.Row key={player.tag || index}>
                  <Table.Cell textAlign="start">{player.rank}</Table.Cell>
                  <Table.Cell display="flex" alignItems="center">
                    {player.icon.url ? (
                      <LazyImage
                        src={player.icon.url}
                        alt={`${player.name}'s icon`}
                        boxSize="35px"
                        borderRadius="md"
                        fit="contain"
                        mr={2}
                      />
                    ) : (
                      <Text>No Icon</Text>
                    )}
                    <VStack align="start">
                      <Link
                        href={`/player/${player.tag.replace("#", "")}`}
                        color={argbToRgba(player.nameColor)}
                        _hover={{
                          opacity: 0.8,
                          transform: "scale(1.1)",
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        {player.name}
                      </Link>
                      <Tag
                        size="sm"
                        variant="outline"
                        colorPalette="orange"
                        cursor="pointer"
                        mr={2}
                        onClick={() => {
                          navigator.clipboard.writeText(player.tag);
                          toaster.create({
                            title: "Player tag copied!",
                            type: "success",
                            duration: 2000,
                          });
                        }}
                      >
                        {player.tag}
                      </Tag>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell>
                    {player.club ? (
                      <Text color={parseClubName(player.club.name).color}>
                        {parseClubName(player.club.name).name}
                      </Text>
                    ) : (
                      <Text>-</Text>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {formatTrophies(player.trophies)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </>
  );
};

export default PlayerLeaderboardPage;
