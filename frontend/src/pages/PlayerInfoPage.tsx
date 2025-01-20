import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  VStack,
  StatRoot,
  StatLabel,
  StatValueText,
  StatHelpText,
  Badge,
  Separator,
} from "@chakra-ui/react";
import { argbToRgba } from "@/utils/colorUtils";
import usePlayerInfo from "@/hooks/usePlayerInfo";

const PlayerInfoPage = () => {
  const { tag } = useParams();
  const { playerInfos, loading, errors } = usePlayerInfo(tag ? [tag] : []);
  const playerInfo = playerInfos[tag!];
  const isLoading = loading[tag!];
  const error = errors[tag!];

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
    club,
    expLevel,
    expPoints,
    isQualifiedFromChampionshipChallenge,
    "3vs3Victories": threeVsThreeVictories,
    soloVictories,
    duoVictories,
  } = playerInfo;

  return (
    <Flex direction="column" align="center" py={8} px={{ base: 4, md: 8 }}>
      <Box textAlign="center" mb={8}>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "4xl" }}
          color={argbToRgba(nameColor)}
          fontWeight="bold"
          mb={2}
        >
          {name}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          #{tag}
        </Text>
        <Text fontSize="lg" mt={2} fontWeight="medium" color="gray.700">
          {club?.name || "No Club"}
        </Text>
      </Box>

      <Box w="100%" maxW="800px">
        <VStack align="stretch" gap={8}>
          <Flex justify="space-between" gap={6} flexWrap="wrap">
            <StatRoot flex="1" minW="180px">
              <StatLabel fontWeight="bold" fontSize="lg">
                Trophies
              </StatLabel>
              <StatValueText color="yellow.500" fontSize="3xl">
                {trophies}
              </StatValueText>
              <StatHelpText fontSize="md" color="gray.600">
                Highest: {highestTrophies}
              </StatHelpText>
            </StatRoot>

            <StatRoot flex="1" minW="180px">
              <StatLabel fontWeight="bold" fontSize="lg">
                Experience
              </StatLabel>
              <StatValueText color="purple.500" fontSize="3xl">
                {expLevel}
              </StatValueText>
              <StatHelpText fontSize="md" color="gray.600">
                {expPoints.toLocaleString()} XP
              </StatHelpText>
            </StatRoot>
          </Flex>

          <Separator borderColor="gray.400" />

          <Flex justify="space-between" gap={6} flexWrap="wrap">
            <StatRoot flex="1" minW="180px">
              <StatLabel fontWeight="bold" fontSize="lg">
                3v3 Victories
              </StatLabel>
              <StatValueText fontSize="2xl" color="blue.500">
                {threeVsThreeVictories}
              </StatValueText>
            </StatRoot>

            <StatRoot flex="1" minW="180px">
              <StatLabel fontWeight="bold" fontSize="lg">
                Solo Victories
              </StatLabel>
              <StatValueText fontSize="2xl" color="green.500">
                {soloVictories}
              </StatValueText>
            </StatRoot>

            <StatRoot flex="1" minW="180px">
              <StatLabel fontWeight="bold" fontSize="lg">
                Duo Victories
              </StatLabel>
              <StatValueText fontSize="2xl" color="red.500">
                {duoVictories}
              </StatValueText>
            </StatRoot>
          </Flex>

          <Separator borderColor="gray.400" />

          <Flex align="center" justify="center" py={4}>
            <StatRoot textAlign="center">
              <StatLabel fontWeight="bold" fontSize="lg">
                Championship Challenge
              </StatLabel>
              <Badge
                colorPalette={
                  isQualifiedFromChampionshipChallenge ? "green" : "red"
                }
                fontSize="xl"
                px={6}
                py={2}
              >
                {isQualifiedFromChampionshipChallenge
                  ? "Qualified"
                  : "Not Qualified"}
              </Badge>
            </StatRoot>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default PlayerInfoPage;
