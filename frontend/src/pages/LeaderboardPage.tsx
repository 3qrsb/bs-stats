import { Stack, Button, Heading, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LeaderboardPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box p={8} textAlign="center">
      <Heading as="h1" mb={6}>
        Choose Leaderboard
      </Heading>
      <Stack direction={{ base: "column", md: "row" }} gap={4} justify="center">
        <Button
          onClick={() => handleNavigation("/leaderboard/global")}
          variant="solid"
          size="lg"
        >
          Player Leaderboard
        </Button>
        <Button
          onClick={() => handleNavigation("/leaderboard/brawler")}
          variant="solid"
          size="lg"
        >
          Brawler Leaderboard
        </Button>
        <Button
          onClick={() => handleNavigation("/leaderboard/club")}
          variant="solid"
          size="lg"
        >
          Club Leaderboard
        </Button>
      </Stack>
    </Box>
  );
};

export default LeaderboardPage;
