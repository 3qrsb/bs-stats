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
  RadioCard,
  HStack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/FeaturesSection";
import TagHelpSection from "@/components/TagHelpSection";
import RecentlySearchedTagsSection from "@/components/RecentlySearchedTagsSection";
import SEO from "@/components/SEO";
import { validatePlayerTag } from "@/hooks/usePlayerInfo";
import { validateClubTag } from "@/hooks/useClubInfo";

const HomePage = () => {
  const [tagType, setTagType] = useState<"player" | "club">("player");
  const [playerTag, setPlayerTag] = useState("");
  const [recentTags, setRecentTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem("recentTags") || "[]");
    setRecentTags(savedTags);
  }, []);

  const handleSearch = async () => {
    if (!playerTag) return;

    const isValid =
      tagType === "player"
        ? await validatePlayerTag(playerTag)
        : await validateClubTag(playerTag);

    if (!isValid) {
      toaster.create({
        title: `Invalid ${tagType === "player" ? "Player" : "Club"} Tag`,
        description: "The tag you entered does not exist or is incorrect.",
        type: "error",
        duration: 4000,
      });
      return;
    }

    if (tagType === "player") {
      setRecentTags((prevTags) => {
        const updatedTags = [
          playerTag,
          ...prevTags.filter((tag) => tag !== playerTag),
        ];
        const newTags = updatedTags.slice(0, 5);
        localStorage.setItem("recentTags", JSON.stringify(newTags));
        return newTags;
      });
    }

    navigate(`/${tagType}/${encodeURIComponent(playerTag)}`);
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
    <>
      <SEO
        title="Brawl Stars Stats | Player Trophy Progression & Leaderboards"
        description="Enter a Brawl Stars player or club tag to track trophy stats, battle logs, and leaderboards. View detailed player profiles and more!"
      />
      
      <VStack mt={12} gap={10} align="center" px={4}>
        <Stack align="center" gap={4}>
          <Text fontWeight="bold" fontSize="xl" textAlign="center" as="h1">
            Enter a Brawl Stars Tag
          </Text>

          <RadioCard.Root
            value={tagType}
            onValueChange={(e) => setTagType(e.value as "player" | "club")}
            orientation="horizontal"
            align="center"
            justify="center"
            size="sm"
            colorPalette="cyan"
          >
            <HStack wrap="wrap" justify="center">
              <RadioCard.Item value="player">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText whiteSpace="nowrap">
                    Player Tag
                  </RadioCard.ItemText>
                </RadioCard.ItemControl>
              </RadioCard.Item>

              <RadioCard.Item value="club">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Club Tag</RadioCard.ItemText>
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </HStack>
          </RadioCard.Root>

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
    </>
  );
};

export default HomePage;
