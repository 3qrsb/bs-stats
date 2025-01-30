import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  Box,
  Spinner,
  Heading,
  VStack,
  Text,
  Table,
  Image,
  Badge,
  Flex,
  Portal,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import useBattleLog from "@/hooks/useBattleLog";
import { parseISO, formatDistanceToNow } from "date-fns";
import useBrawlerIcons from "@/hooks/BrawlApiIcons/useBrawlerIcons";
import useMapIcons from "@/hooks/BrawlApiIcons/useMapIcons";
import { formatRoleName } from "@/utils/stringUtils";

const BattleLogPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const { battleLog, loading, error } = useBattleLog(tag || "");
  const { brawlerIcons } = useBrawlerIcons();
  const { mapIcons } = useMapIcons();

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  const openMap = (mapUrl: string) => {
    setSelectedMap(mapUrl);
    setIsMapOpen(true);
  };

  const closeMap = () => {
    setIsMapOpen(false);
    setSelectedMap(null);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="8">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!battleLog || battleLog.length === 0) {
    return (
      <Box textAlign="center" mt="8">
        <Text>No battle log data available.</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box color="red.500" mt="8" textAlign="center">
        {error}
      </Box>
    );
  }

  return (
    <Box p={{ base: 2, md: 8 }} maxW="1100px" mx="auto">
      <Heading fontSize={{ base: "2xl", md: "3xl" }} textAlign="center" mb={6}>
        Battle Log
      </Heading>

      <VStack gap={4} align="stretch">
        <Table.ScrollArea
          borderWidth="1px"
          rounded="md"
          maxW="100%"
          overflowX="auto"
        >
          <Table.Root size="lg">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader minW="150px">Battle</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" minW="100px">
                  Result
                </Table.ColumnHeader>
                <Table.ColumnHeader minW="350px">Players</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {battleLog?.length > 0 ? (
                battleLog.map((battle, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Flex align="center" gap={4}>
                        <Flex direction="column" align="center">
                          {mapIcons[battle.event.id] ? (
                            <>
                              <Box
                                as="button"
                                onClick={() =>
                                  openMap(mapIcons[battle.event.id].imageUrl)
                                }
                                _hover={{
                                  transform: "scale(1.05)",
                                  transition: "0.2s",
                                }}
                              >
                                <Image
                                  src={mapIcons[battle.event.id].imageUrl}
                                  alt={mapIcons[battle.event.id].name}
                                  boxSize="50px"
                                  rounded="md"
                                />
                              </Box>
                              <Text fontWeight="bold" fontSize="sm" mt={2}>
                                {mapIcons[battle.event.id].name ||
                                  "Unknown Map"}
                              </Text>
                            </>
                          ) : (
                            <Text>No Map Available</Text>
                          )}
                        </Flex>
                      </Flex>

                      <Text color="gray.500" fontSize="sm">
                        {formatRoleName(battle.event.mode)}
                      </Text>

                      <Text fontSize="xs" color="gray.400" mt={1}>
                        {formatDistanceToNow(parseISO(battle.battleTime))} ago
                      </Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Flex
                        direction="column"
                        align="center"
                        gap={2}
                        justify="center"
                      >
                        <Badge
                          boxShadow="md"
                          colorPalette={
                            battle.battle.result === "victory"
                              ? "green"
                              : battle.battle.result === "defeat"
                              ? "red"
                              : "gray"
                          }
                          fontSize="md"
                          px={3}
                          py={1}
                        >
                          {battle.battle.result || "N/A"}
                        </Badge>

                        {battle.battle.trophyChange !== undefined && (
                          <Text
                            color={
                              battle.battle.trophyChange > 0
                                ? "green.500"
                                : "red.500"
                            }
                            fontSize="sm"
                            fontWeight="bold"
                            textAlign="center"
                          >
                            {battle.battle.trophyChange > 0
                              ? `+${battle.battle.trophyChange}`
                              : battle.battle.trophyChange}
                          </Text>
                        )}
                      </Flex>
                    </Table.Cell>

                    <Table.Cell>
                      <Flex
                        justifyContent="space-between"
                        alignItems="flex-start"
                        gap={6}
                      >
                        {battle.battle.teams?.map((team, teamIndex) => (
                          <VStack key={teamIndex} align="stretch" flex="1">
                            {team.map((player) => (
                              <Flex
                                key={player.tag}
                                align="center"
                                gap={2}
                                position="relative"
                                justify="flex-start"
                              >
                                <Box position="relative">
                                  {brawlerIcons[player.brawler.id] ? (
                                    <Image
                                      src={brawlerIcons[player.brawler.id]}
                                      alt={player.brawler.name}
                                      boxSize="35px"
                                    />
                                  ) : (
                                    <Text>No Icon</Text>
                                  )}
                                  {battle.battle.starPlayer?.tag ===
                                    player.tag && (
                                    <Badge
                                      colorPalette="yellow"
                                      boxShadow="md"
                                      position="absolute"
                                      top="0"
                                      left="0"
                                      transform="translate(-50%, -50%)"
                                    >
                                      <FaStar />
                                    </Badge>
                                  )}
                                </Box>

                                <Link
                                  href={`/player/${player.tag.replace(
                                    "#",
                                    ""
                                  )}`}
                                  fontSize="sm"
                                  fontWeight="bold"
                                  _hover={{
                                    opacity: 0.8,
                                    transition: "all 0.3s ease-in-out",
                                  }}
                                >
                                  {player.name}
                                </Link>
                              </Flex>
                            ))}
                          </VStack>
                        )) || <Text>No players available</Text>}
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={4} textAlign="center">
                    No battle log data available.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </VStack>

      {isMapOpen && (
        <Portal>
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            bg="blackAlpha.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="overlay"
            onClick={closeMap}
          >
            <Image
              src={selectedMap!}
              alt="Enlarged Map"
              maxW="90%"
              maxH="90%"
              border="2px solid white"
              borderRadius="lg"
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export default BattleLogPage;
