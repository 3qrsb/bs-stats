import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Spinner,
  VStack,
  Separator,
  Card,
  StatRoot,
  StatLabel,
  StatValueText,
  StatHelpText,
  StatUpIndicator,
  Link,
} from "@chakra-ui/react";
import { Tag } from "@/components/ui/tag";
import { toaster } from "@/components/ui/toaster";
import LazyImage from "@/components/LazyImage";
import SEO from "@/components/SEO";
import usePlayerInfo from "@/hooks/usePlayerInfo";
import useClubInfo from "@/hooks/useClubInfo";
import usePlayerIcons from "@/hooks/BrawlApiIcons/usePlayerIcons";
import useClubIcons from "@/hooks/BrawlApiIcons/useClubIcons";
import { argbToRgba, parseClubName } from "@/utils/colorUtils";

const PlayerDetailsPage = () => {
  const { tag } = useParams();
  const { playerInfos, loading, errors } = usePlayerInfo(tag ? [tag] : []);
  const { playerIcons } = usePlayerIcons();
  const { clubIcons } = useClubIcons();

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
    <>
      <SEO
        title={`Brawl Stars Player Stats - ${name} (#${tag})`}
        description={`Check out the detailed stats of ${name} (#${tag}) in Brawl Stars. View trophies progression, battle log, and more.`}
      />

      <Flex direction="column" align="center" py={8} px={{ base: 4, md: 8 }}>
        <Box textAlign="start" mb={8} w="100%" maxW="900px">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={8}
          >
            <Flex align="center" gap={4}>
              {playerIcons[icon.id] && (
                <LazyImage
                  src={playerIcons[icon.id]}
                  alt={`${name}'s Icon`}
                  boxSize="100px"
                />
              )}
              <Box>
                <Heading
                  as="h1"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  color={nameColor ? argbToRgba(nameColor) : undefined}
                >
                  {name}
                </Heading>
                <Tag
                  size="sm"
                  variant="outline"
                  colorPalette="orange"
                  cursor="pointer"
                  mt={2}
                  onClick={() => {
                    navigator.clipboard.writeText(`#${tag}`);
                    toaster.create({
                      title: "Player tag copied!",
                      type: "success",
                      duration: 2000,
                    });
                  }}
                >
                  #{tag}
                </Tag>
              </Box>
            </Flex>

            {club && (
              <Flex
                align="center"
                gap={4}
                p={3}
                borderWidth="1px"
                borderRadius="md"
              >
                {clubIcons[club.badgeId] && (
                  <LazyImage
                    src={clubIcons[club.badgeId]}
                    alt={`${club.name} Badge`}
                    boxSize="30px"
                    fit="contain"
                  />
                )}
                <VStack align="start">
                  <Link
                    href={`/club/${club.tag.replace("#", "")}`}
                    color={parseClubName(club.name).color}
                    fontSize="large"
                    fontWeight="bold"
                    _hover={{
                      opacity: 0.8,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {parseClubName(club.name).name}
                  </Link>
                </VStack>
              </Flex>
            )}
          </Flex>

          <Flex justify="center" mt={4}>
            <Link
              href={`/player/${tag}/battlelog`}
              colorPalette="orange"
              fontSize="large"
              _hover={{
                opacity: 0.9,
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              View Battle Log
            </Link>
          </Flex>
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
    </>
  );
};

export default PlayerDetailsPage;
