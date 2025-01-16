import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import { Box, Input, VStack, Group, InputAddon } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [playerTag, setPlayerTag] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (playerTag) {
      navigate(`/player/${encodeURIComponent(playerTag)}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/#/g, "");
    setPlayerTag(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <VStack mt={8}>
      <Box>Enter a Brawl Stars Player Tag:</Box>
      <Group attached>
        <InputAddon>
          <FaHashtag />
        </InputAddon>
        <InputGroup>
          <Input
            placeholder="2V8RUCP"
            value={playerTag}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            maxWidth="400px"
            size="lg"
          />
        </InputGroup>
      </Group>
      <Button colorPalette="cyan" variant="subtle" onClick={handleSearch}>
        Search
      </Button>
    </VStack>
  );
};

export default HomePage;
