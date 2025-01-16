import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import {
  Box,
  Input,
  HStack,
  VStack,
  Group,
  InputAddon,
  Badge,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import usePlayerInfo from "@/hooks/usePlayerInfo";

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
    if (playerTag) {
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

  const handleRecentTagClick = (tag: string) => {
    navigate(`/player/${encodeURIComponent(tag)}`);
  };

  return (
    <VStack mt={8}>
      <Box fontWeight="bold">Enter a Brawl Stars Player Tag:</Box>
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
      <Button
        size="md"
        colorPalette="cyan"
        variant="subtle"
        onClick={handleSearch}
      >
        Search
      </Button>

      {recentTags.length > 0 && (
        <Box mt={4}>
          <Box fontWeight="bold" textAlign="center">
            Recently Searched Tags:
          </Box>
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
                >
                  {`#${tag}`}
                </Badge>
              </Tooltip>
            ))}
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

export default HomePage;
