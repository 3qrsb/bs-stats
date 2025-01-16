import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  VStack,
  StatLabel,
  StatValueText,
  Separator,
  StatRoot,
} from "@chakra-ui/react";
import usePlayerInfo from "@/hooks/usePlayerInfo";

const PlayerInfoPage = () => {
  const { tag } = useParams();
  const { playerInfo, loading, error } = usePlayerInfo(tag!);

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

  if (!playerInfo) {
    return (
      <Box color="red.500" mt="8">
        Player information not available.
      </Box>
    );
  }

  const { name, trophies, club, expLevel, expPoints } = playerInfo;

  return (
    <Box p={8} maxWidth="800px" mx="auto">
      <Heading as="h1" mb={4} textAlign="center">
        Player Info
      </Heading>
      <Flex
        direction="column"
        bg="gray.100"
        p={6}
        borderRadius="md"
        boxShadow="md"
      >
        <VStack align="stretch">
          <StatRoot>
            <StatLabel>Player Name</StatLabel>
            <StatValueText>{name}</StatValueText>
          </StatRoot>
          <Separator />
          <StatRoot>
            <StatLabel>Trophies</StatLabel>
            <StatValueText>{trophies}</StatValueText>
          </StatRoot>
          <Separator />
          <StatRoot>
            <StatLabel>Experience Level</StatLabel>
            <StatValueText>{expLevel}</StatValueText>
          </StatRoot>
          <Separator />
          <StatRoot>
            <StatLabel>Experience Points</StatLabel>
            <StatValueText>{expPoints}</StatValueText>
          </StatRoot>
          <Separator />
          <Box>
            <Text fontWeight="bold">Club:</Text>
            <Text>{club?.name || "No Club"}</Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default PlayerInfoPage;
