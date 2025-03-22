import { useSearchParams } from "react-router-dom";
import {
  Box,
  Spinner,
  Table,
  Heading,
  Image,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Tag } from "@/components/ui/tag";
import { toaster } from "@/components/ui/toaster";
import CountrySelect from "@/components/CountrySelect";
import ErrorState from "@/components/ErrorState";
import useClubLeaderboard from "@/hooks/leaderboard/useClubLeaderboard";
import useCountries, { Country } from "@/hooks/useCountries";
import { parseClubName } from "@/utils/colorUtils";
import { refetchAll } from "@/utils/refetchAll";

const ClubLeaderboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const countryParam = searchParams.get("country");
  const country =
    countryParam && countryParam !== "global" ? countryParam : "global";

  const {
    leaderboard,
    loading: leaderboardLoading,
    error,
    refetch: refetchLeaderboard,
  } = useClubLeaderboard(country);

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
    <Box p={{ base: 2, md: 8 }} maxW={{ base: "100%", md: "1100px" }} mx="auto">
      <Heading mb={6} fontSize={{ base: "2xl", md: "3xl" }} textAlign="center">
        Club Leaderboard
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
                Club
              </Table.ColumnHeader>
              <Table.ColumnHeader minW="150px" scope="col">
                Members
              </Table.ColumnHeader>
              <Table.ColumnHeader minW="100px" scope="col" textAlign="end">
                Trophies
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {leaderboard.map((club) => (
              <Table.Row key={club.tag}>
                <Table.Cell textAlign="start">{club.rank}</Table.Cell>
                <Table.Cell display="flex" alignItems="center">
                  {club.badgeUrl ? (
                    <Image
                      src={club.badgeUrl}
                      alt={`${club.name}'s badge`}
                      boxSize="35px"
                      borderRadius="md"
                      fit="contain"
                      mr={2}
                    />
                  ) : (
                    <Text>No Badge</Text>
                  )}
                  <VStack align="start">
                    <Link
                      href={`/club/${club.tag.replace("#", "")}`}
                      color={parseClubName(club.name).color}
                      _hover={{
                        opacity: 0.8,
                        transform: "scale(1.1)",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {parseClubName(club.name).name}
                    </Link>
                    <Tag
                      size="sm"
                      variant="outline"
                      colorPalette="orange"
                      cursor="pointer"
                      mr={2}
                      onClick={() => {
                        navigator.clipboard.writeText(club.tag);
                        toaster.create({
                          title: "Club tag copied!",
                          type: "success",
                          duration: 2000,
                        });
                      }}
                    >
                      {club.tag}
                    </Tag>
                  </VStack>
                </Table.Cell>
                <Table.Cell>{club.memberCount}/30</Table.Cell>
                <Table.Cell textAlign="end">{club.trophies}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};

export default ClubLeaderboardPage;
