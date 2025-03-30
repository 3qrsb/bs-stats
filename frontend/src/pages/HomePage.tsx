import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashIcon } from "lucide-react";
import {
  Box,
  Input,
  HStack,
  VStack,
  Group,
  InputAddon,
  Badge,
  Text,
  Stack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import usePlayerInfo from "@/hooks/usePlayerInfo";
import FeaturesSection from "@/components/FeaturesSection";
import TagHelpSection from "@/components/TagHelpSection";

const HomePage = () => {
  const [playerTag, setPlayerTag] = useState("");
  const [recentTags, setRecentTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem("recentTags") || "[]");
    setRecentTags(savedTags);
  }, []);

  const { playerInfos, loading, errors } = usePlayerInfo(recentTags);

  const handleSearch = () => {
    if (!playerTag) return;

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

  const handleRecentTagClick = (tag: string) => {
    navigate(`/player/${encodeURIComponent(tag)}`);
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
        <Box>
          <Text fontWeight="bold" fontSize="lg" textAlign="center">
            Recently Searched Tags
          </Text>
          <HStack mt={2} gap={{ base: 1, md: 2 }} justify="center" wrap="wrap">
            {recentTags.map((tag) => (
              <Tooltip
                interactive
                showArrow
                openDelay={200}
                closeDelay={50}
                content={
                  loading[tag]
                    ? "Loading..."
                    : errors[tag]
                    ? errors[tag]
                    : playerInfos[tag]?.name || "No name available"
                }
                key={tag}
              >
                <Badge
                  variant="surface"
                  onClick={() => handleRecentTagClick(tag)}
                  size={{ base: "sm", md: "md" }}
                  colorPalette="orange"
                  cursor="pointer"
                >
                  {`#${tag}`}
                </Badge>
              </Tooltip>
            ))}
          </HStack>
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
