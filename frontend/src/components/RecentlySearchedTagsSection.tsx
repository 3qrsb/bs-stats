import {
  Box,
  Grid,
  HStack,
  Text,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import usePlayerInfo from "@/hooks/usePlayerInfo";
import useClubInfo from "@/hooks/useClubInfo";
import type { TagEntry, TagType } from "@/types/search";

type RecentlySearchedTagsSectionProps = {
  tags: TagEntry[];
};

const RecentlySearchedTagsSection = ({
  tags,
}: RecentlySearchedTagsSectionProps) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;

  const playerTags = tags
    .filter((entry) => entry.type === "player")
    .map((entry) => entry.tag);
  const clubTags = tags
    .filter((entry) => entry.type === "club")
    .map((entry) => entry.tag);

  const {
    playerInfos,
    loading: playerLoading,
    errors: playerErrors,
  } = usePlayerInfo(playerTags);
  const {
    clubInfos,
    loading: clubLoading,
    errors: clubErrors,
  } = useClubInfo(clubTags);

  const groupValidTags = (entries: TagEntry[], type: TagType) =>
    entries.filter(({ tag }) => {
      if (type === "player") {
        return !playerErrors[tag] && playerInfos[tag] && !playerLoading[tag];
      } else {
        return !clubErrors[tag] && clubInfos[tag] && !clubLoading[tag];
      }
    });

  const validPlayerTags = groupValidTags(
    tags.filter((t) => t.type === "player"),
    "player"
  );
  const validClubTags = groupValidTags(
    tags.filter((t) => t.type === "club"),
    "club"
  );

  if (validPlayerTags.length === 0 && validClubTags.length === 0) return null;

  const handleTagClick = (tag: string, type: TagType) => {
    navigate(`/${type}/${encodeURIComponent(tag)}`);
  };

  const renderTagGroup = (
    entries: TagEntry[],
    type: TagType,
    label: string
  ) => {
    const infoMap = type === "player" ? playerInfos : clubInfos;
    const color = type === "player" ? "orange" : "purple";

    const renderBadge = (entry: TagEntry) => {
      const { tag } = entry;
      const name =
        infoMap[tag]?.name ||
        `Unknown ${type === "player" ? "Player" : "Club"}`;
      return (
        <Tooltip
          key={`${tag}-${type}`}
          interactive
          showArrow
          openDelay={200}
          closeDelay={50}
          content={name}
        >
          <Badge
            variant="surface"
            onClick={() => handleTagClick(tag, type)}
            size={{ base: "sm", md: "md" }}
            colorPalette={color}
            cursor="pointer"
          >
            {`#${tag}`}
          </Badge>
        </Tooltip>
      );
    };

    if (isMobile) {
      return (
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            {label}
          </Text>
          <HStack wrap="wrap" gap={{ base: 1, md: 2 }} justify="center">
            {entries.map(renderBadge)}
          </HStack>
        </Box>
      );
    }

    const firstRow = entries.slice(0, 3);
    const secondRow = entries.slice(3);

    return (
      <Box textAlign="center">
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          {label}
        </Text>
        <HStack justify="center" gap={{ base: 1, md: 2 }}>
          {firstRow.map(renderBadge)}
        </HStack>
        {secondRow.length > 0 && (
          <HStack mt={2} justify="center" gap={{ base: 1, md: 2 }}>
            {secondRow.map(renderBadge)}
          </HStack>
        )}
      </Box>
    );
  };

  const groups: JSX.Element[] = [];
  if (validPlayerTags.length > 0) {
    groups.push(
      renderTagGroup(validPlayerTags, "player", "Recent Player Tags")
    );
  }
  if (validClubTags.length > 0) {
    groups.push(renderTagGroup(validClubTags, "club", "Recent Club Tags"));
  }

  return (
    <Grid
      maxW={{ md: "800px" }}
      mx="auto"
      templateColumns={{
        base: "1fr",
        md: groups.length === 1 ? "1fr" : "1fr 1fr",
      }}
      gap={5}
      justifyItems="center"
      alignItems="start"
      textAlign="center"
    >
      {groups.map((group, index) => (
        <Box key={index}>{group}</Box>
      ))}
    </Grid>
  );
};

export default RecentlySearchedTagsSection;
