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
  VStack,
  Link,
} from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tag } from "@/components/ui/tag";
import { Toaster, toaster } from "@/components/ui/toaster";
import { parseClubName } from "@/utils/colorUtils";
import useClubLeaderboard from "@/hooks/useClubLeaderboard";
import useCountries from "@/hooks/useCountries";

const ClubLeaderboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const countryParam = searchParams.get("country");
  const country =
    countryParam && countryParam !== "global" ? countryParam : "global";

  const {
    leaderboard,
    loading: leaderboardLoading,
    error,
  } = useClubLeaderboard(country);

  const {
    countries,
    loading: countriesLoading,
    error: countriesError,
  } = useCountries();

  const handleCountryChange = (details: { value: string[] }) => {
    if (details.value.length > 0) {
      setSearchParams({ country: details.value[0] });
    }
  };

  const countryCollection = createListCollection({
    items: countries.map(({ label, value }) => ({ label, value })),
  });

  const selectedCountry = countries.find((c) => c.value === country);

  if (countriesLoading || leaderboardLoading) {
    return (
      <Box textAlign="center" mt="8">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (countriesError || error) {
    const errorMessage = countriesError || error;
    return (
      <Box color="red.500" mt="8">
        {errorMessage}
      </Box>
    );
  }

  return (
    <Box p={{ base: 2, md: 8 }} maxW={{ base: "100%", md: "1100px" }} mx="auto">
      <Heading mb={6} fontSize={{ base: "2xl", md: "3xl" }} textAlign="center">
        Club Leaderboard
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
            {leaderboard.map((club, index) => (
              <Table.Row key={index}>
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
                    <Toaster />
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
