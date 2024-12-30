import { useNavigate } from "react-router-dom";
import { Box, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";

const HomePage = () => {
  const [playerTag, setPlayerTag] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (playerTag) {
      navigate(`/player/${encodeURIComponent(playerTag)}`);
    }
  };

  return (
    <VStack spaceX={4} mt={8}>
      <Box>Enter a Brawl Stars Player Tag:</Box>
      <Input
        placeholder="Player Tag (e.g., #2V8RUCP)"
        value={playerTag}
        onChange={(e) => setPlayerTag(e.target.value)}
        maxWidth="400px"
      />
      <Button colorScheme="teal" onClick={handleSearch}>
        Search Player
      </Button>
    </VStack>
  );
};

export default HomePage;
