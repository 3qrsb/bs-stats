import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  VStack,
  Badge,
  Separator,
  Image,
  Card,
  StatRoot,
  StatLabel,
  StatValueText,
  StatHelpText,
  StatUpIndicator,
} from "@chakra-ui/react";
import { argbToRgba } from "@/utils/colorUtils";
import usePlayerInfo from "@/hooks/usePlayerInfo";
import useClubInfo from "@/hooks/useClubInfo";
import useBrawlIcons from "@/hooks/useBrawlIcons";

const PlayerDetailsPage = () => {
  const { tag } = useParams();
  const { playerInfos, loading, errors } = usePlayerInfo(tag ? [tag] : []);
  const { playerIcons, clubIcons } = useBrawlIcons();

  const playerInfo = playerInfos[tag!];
  const isLoading = loading[tag!];
  const error = errors[tag!];

  const clubTag = playerInfo?.club?.tag?.replace("#", "") || "";
  const { clubInfos } = useClubInfo(clubTag ? [clubTag] : []);
  const club = clubInfos[clubTag];

  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box color="red.500" textAlign="center" mt="8">
        {error}
      </Box>
    );
  }

  if (!playerInfo) {
    return (
      <Box color="red.500" textAlign="center" mt="8">
        Player information not available.
      </Box>
    );
  }

  const {
    name,
    nameColor,
    trophies,
    highestTrophies,
    expLevel,
    expPoints,
    "3vs3Victories": threeVsThreeVictories,
    soloVictories,
    duoVictories,
    icon,
  } = playerInfo;

  return (
    <Flex direction="column" align="center" py={8} px={{ base: 4, md: 8 }}>
      <Box textAlign="start" mb={8}>
        <Flex align="center" justify="center" gap={4}>
          {playerIcons[icon.id] && (
            <Image
              src={playerIcons[icon.id]}
              alt={`${name}'s Icon`}
              boxSize="100px"
            />
          )}
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl" }}
              color={argbToRgba(nameColor)}
              fontWeight="bold"
            >
              {name}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              #{tag}
            </Text>
          </Box>
        </Flex>

        {club && (
          <Flex align="center" justify="center" mt={4} gap={2}>
            {clubIcons[club.badgeId] && (
              <Image
                src={clubIcons[club.badgeId]}
                alt={`${club.name} Badge`}
                boxSize="50px"
              />
            )}
            <VStack align="start" gap={1}>
              <Text fontSize="lg" fontWeight="medium" color="gray.700">
                {club.name}
              </Text>
              <Badge
                colorScheme="orange"
                fontSize="md"
                px={4}
                py={1}
                cursor="pointer"
                onClick={() => navigator.clipboard.writeText(club.tag)}
              >
                {club.tag}
              </Badge>
            </VStack>
          </Flex>
        )}
      </Box>

      <Box w="100%" maxW="900px">
        <VStack align="stretch" gap={8}>
          <Flex justify="space-between" gap={6} flexWrap="wrap">
            <Card.Root flex="1" minW="200px">
              <Card.Body>
                <StatRoot>
                  <StatLabel fontWeight="bold" fontSize="lg">
                    Trophies
                  </StatLabel>
                  <StatValueText color="yellow.500" fontSize="3xl">
                    {trophies.toLocaleString()}
                  </StatValueText>
                  <StatHelpText fontSize="md" color="gray.600">
                    <StatUpIndicator />
                    Highest: {highestTrophies.toLocaleString()}
                  </StatHelpText>
                </StatRoot>
              </Card.Body>
            </Card.Root>

            <Card.Root flex="1" minW="200px">
              <Card.Body>
                <StatRoot>
                  <StatLabel fontWeight="bold" fontSize="lg">
                    Experience
                  </StatLabel>
                  <StatValueText color="purple.500" fontSize="3xl">
                    {expLevel}
                  </StatValueText>
                  <StatHelpText fontSize="md" color="gray.600">
                    <StatUpIndicator />
                    {expPoints.toLocaleString()} XP
                  </StatHelpText>
                </StatRoot>
              </Card.Body>
            </Card.Root>
          </Flex>

          <Separator borderColor="gray.400" />

          <Flex justify="space-between" gap={6} flexWrap="wrap">
            <Card.Root flex="1" minW="200px">
              <Card.Body>
                <StatRoot>
                  <StatLabel>3v3 Victories</StatLabel>
                  <StatValueText color="blue.500" fontSize="2xl">
                    {threeVsThreeVictories.toLocaleString()}
                  </StatValueText>
                </StatRoot>
              </Card.Body>
            </Card.Root>

            <Card.Root flex="1" minW="200px">
              <Card.Body>
                <StatRoot>
                  <StatLabel>Solo Victories</StatLabel>
                  <StatValueText color="green.500" fontSize="2xl">
                    {soloVictories.toLocaleString()}
                  </StatValueText>
                </StatRoot>
              </Card.Body>
            </Card.Root>

            <Card.Root flex="1" minW="200px">
              <Card.Body>
                <StatRoot>
                  <StatLabel>Duo Victories</StatLabel>
                  <StatValueText color="red.500" fontSize="2xl">
                    {duoVictories.toLocaleString()}
                  </StatValueText>
                </StatRoot>
              </Card.Body>
            </Card.Root>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default PlayerDetailsPage;
