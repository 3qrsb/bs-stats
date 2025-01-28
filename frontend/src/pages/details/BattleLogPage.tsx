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
} from "@chakra-ui/react";
import useBattleLog from "@/hooks/useBattleLog";
import { parseISO, formatDistanceToNow } from "date-fns";
import useBrawlerIcons from "@/hooks/BrawlApiIcons/useBrawlerIcons";
import useEventIcons from "@/hooks/BrawlApiIcons/useEventIcons";

const BattleLogPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const { battleLog, loading, error } = useBattleLog(tag || "");
  const { brawlerIcons } = useBrawlerIcons();
  const { eventIcons } = useEventIcons();

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
                <Table.ColumnHeader minW="100px">Result</Table.ColumnHeader>
                <Table.ColumnHeader minW="350px">Players</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {battleLog?.length > 0 ? (
                battleLog.map((battle, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      display="flex"
                      flexDirection="column"
                      alignItems="start"
                    >
                      {eventIcons[battle.event.id] ? (
                        <>
                          <Image
                            src={eventIcons[battle.event.id]}
                            alt={battle.event.mode}
                            boxSize="50px"
                            mb={2}
                          />
                          <Text fontWeight="bold">
                            {eventIcons[battle.event.id]}
                          </Text>
                        </>
                      ) : (
                        <Text>No Image Available</Text>
                      )}
                      <Text color="gray.500">{battle.event.mode}</Text>
                      <Text fontSize="sm" color="gray.400">
                        {formatDistanceToNow(parseISO(battle.battleTime))} ago
                      </Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Badge
                        boxShadow="md"
                        colorPalette={
                          battle.battle.result === "victory"
                            ? "green"
                            : battle.battle.result === "defeat"
                            ? "red"
                            : "gray"
                        }
                      >
                        {battle.battle.result || "N/A"}
                      </Badge>
                      {battle.battle.trophyChange !== undefined ? (
                        <Text
                          color={
                            battle.battle.trophyChange > 0
                              ? "green.500"
                              : "red.500"
                          }
                          fontSize="sm"
                        >
                          {battle.battle.trophyChange > 0
                            ? `+${battle.battle.trophyChange}`
                            : battle.battle.trophyChange}
                        </Text>
                      ) : (
                        "-"
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Flex justifyContent="space-between" flexWrap="wrap">
                        {battle.battle.teams?.map((team, teamIndex) => (
                          <VStack key={teamIndex} align="stretch" gap={3}>
                            {team.map((player) => (
                              <Flex
                                key={player.tag}
                                align="center"
                                gap={1}
                                position="relative"
                                justify="flex-start"
                              >
                                {brawlerIcons[player.brawler.id] ? (
                                  <Image
                                    src={brawlerIcons[player.brawler.id]}
                                    alt={player.brawler.name}
                                    boxSize="35px"
                                  />
                                ) : (
                                  <Text>No Icon</Text>
                                )}

                                <Text fontSize="sm">{player.name}</Text>

                                {battle.battle.starPlayer?.tag ===
                                  player.tag && (
                                  <Badge colorPalette="yellow" boxShadow="md">
                                    <FaStar />
                                  </Badge>
                                )}
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
    </Box>
  );
};

export default BattleLogPage;
