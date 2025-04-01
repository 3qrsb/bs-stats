import { Box, HStack, Text, Badge } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import usePlayerInfo from "@/hooks/usePlayerInfo";

type RecentlySearchedTagsSectionProps = {
  tags: string[];
};

const RecentlySearchedTagsSection = ({
  tags,
}: RecentlySearchedTagsSectionProps) => {
  const navigate = useNavigate();
  const { playerInfos, loading, errors } = usePlayerInfo(tags);

  const handleTagClick = (tag: string) => {
    navigate(`/player/${encodeURIComponent(tag)}`);
  };

  const validTags = tags.filter(
    (tag) => !errors[tag] && playerInfos[tag] && !loading[tag]
  );

  if (validTags.length === 0) return null;

  return (
    <Box>
      <Text fontWeight="bold" fontSize="lg" textAlign="center">
        Recently Searched Player Tags
      </Text>
      <HStack mt={2} gap={{ base: 1, md: 2 }} justify="center" wrap="wrap">
        {validTags.map((tag) => (
          <Tooltip
            interactive
            showArrow
            openDelay={200}
            closeDelay={50}
            content={playerInfos[tag]?.name || "No name available"}
            key={tag}
          >
            <Badge
              variant="surface"
              onClick={() => handleTagClick(tag)}
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
  );
};

export default RecentlySearchedTagsSection;
