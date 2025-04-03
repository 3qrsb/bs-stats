import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashIcon } from "lucide-react";
import {
  Box,
  Input,
  VStack,
  Group,
  InputAddon,
  Text,
  Stack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/FeaturesSection";
import TagHelpSection from "@/components/TagHelpSection";
import RecentlySearchedTagsSection from "@/components/RecentlySearchedTagsSection";
import { validatePlayerTag } from "@/hooks/usePlayerInfo";

const HomePage = () => {
  const [playerTag, setPlayerTag] = useState("");
  const [recentTags, setRecentTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem("recentTags") || "[]");
    setRecentTags(savedTags);
  }, []);

  const handleSearch = async () => {
    if (!playerTag) return;

    const isValid = await validatePlayerTag(playerTag);
    if (!isValid) {
      toaster.create({
        title: "Invalid Player Tag",
        description: "The tag you entered does not exist or is incorrect.",
        type: "error",
        duration: 4000,
      });
      return;
    }

    setRecentTags((prevTags) => {
      const updatedTags = [
        playerTag,
        ...prevTags.filter((tag) => tag !== playerTag),
      ];
      const newTags = updatedTags.slice(0, 5);
      localStorage.setItem("recentTags", JSON.stringify(newTags));
      return newTags;
    });

    navigate(`/player/${encodeURIComponent(playerTag)}`);
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
    <VStack mt={12} gap={10} align="center" px={4}>
      <Stack align="center" gap={4}>
        <Text fontWeight="bold" fontSize="xl" textAlign="center">
          Enter a Brawl Stars Player Tag
        </Text>

        <Group attached>
          <InputAddon>
            <HashIcon />
          </InputAddon>
          <InputGroup>
            <Input
              placeholder="8L2CCUJ8V"
              value={playerTag}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              maxWidth="400px"
              size="lg"
              autoFocus
            />
          </InputGroup>
        </Group>

        <Button
          size="xl"
          fontSize="lg"
          colorPalette="cyan"
          variant="subtle"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>

      {recentTags.length > 0 && (
        <Box w="100%">
          <RecentlySearchedTagsSection tags={recentTags} />
        </Box>
      )}

      <Box w="100%">
        <TagHelpSection />
      </Box>

      <Box w="100%">
        <FeaturesSection />
      </Box>
    </VStack>
  );
};

export default HomePage;
