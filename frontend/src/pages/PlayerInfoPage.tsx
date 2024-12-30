import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  VStack,
  Stat,
  StatLabel,
  StatValueText,
  Separator,
  StatRoot,
} from "@chakra-ui/react";
import axios from "axios";

const PlayerInfoPage = () => {
  const { tag } = useParams();
  const [playerInfo, setPlayerInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/brawl-stars/players/${tag}`
        );
        setPlayerInfo(response.data);
      } catch (err) {
        setError("Failed to fetch player information");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerInfo();
  }, [tag]);

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
