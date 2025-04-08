import { useParams } from "react-router-dom";
import {
  Box,
  Spinner,
  Heading,
  Text,
  VStack,
  Table,
  Link,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Tag } from "@/components/ui/tag";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import LazyImage from "@/components/LazyImage";
import SEO from "@/components/SEO";
import useClubInfo from "@/hooks/useClubInfo";
import usePlayerIcons from "@/hooks/BrawlApiIcons/usePlayerIcons";
import useClubIcons from "@/hooks/BrawlApiIcons/useClubIcons";
import { argbToRgba, parseClubName } from "@/utils/colorUtils";
import { formatRoleName } from "@/utils/stringUtils";

const ClubDetailsPage = () => {
  const { clubTag } = useParams<{ clubTag: string }>();
  const { clubInfos, loading, errors } = useClubInfo([clubTag || ""]);
  const {
    playerIcons,
    loading: playerIconsLoading,
    error: playerIconsError,
  } = usePlayerIcons();
  const {
    clubIcons,
    loading: clubIconsLoading,
    error: clubIconsError,
  } = useClubIcons();

  if (loading[clubTag || ""] || playerIconsLoading || clubIconsLoading) {
    return (
      <Box textAlign="center" mt="8">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (errors[clubTag || ""] || playerIconsError || clubIconsError) {
    return (
      <Box color="red.500" mt="8" textAlign="center">
        {errors[clubTag || ""] || playerIconsError || clubIconsError}
      </Box>
    );
  }

  const club = clubInfos[clubTag || ""];

  if (!club) {
    return (
      <Box textAlign="center" mt="8">
        <Text>No club data found.</Text>
      </Box>
    );
  }

  return (
    <>
      <SEO
        title={`Brawl Stars Club Stats - ${club.name} (${club.tag})`}
        description={`Explore the stats of ${club.name} (${club.tag}) in Brawl Stars. View club trophies, members, and more.`}
      />

      <Box
        p={{ base: 2, md: 8 }}
        maxW={{ base: "100%", md: "1100px" }}
        mx="auto"
      >
        <VStack gap={6} align="stretch">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={4}
          >
            {clubIcons[club.badgeId] ? (
              <LazyImage
                src={clubIcons[club.badgeId]}
                alt={`${club.name} Badge`}
                boxSize="70px"
                fit="contain"
              />
            ) : (
              <Text>No Badge Available</Text>
            )}
            <VStack align="start">
              <Heading fontSize={{ base: "2xl", md: "3xl" }} textAlign="center">
                <Text color={parseClubName(club.name).color}>
                  {parseClubName(club.name).name}
                </Text>
              </Heading>

              <Tag
                size="lg"
                variant="outline"
                colorPalette="orange"
                cursor="pointer"
                onClick={() => {
                  navigator.clipboard.writeText(club.tag);
                  toaster.create({
                    title: "Club tag copied!",
                    type: "success",
                    duration: 2000,
                  });
                }}
              >
                {club.tag}
              </Tag>
            </VStack>
          </Box>

          <Text fontSize="lg" textAlign="center">
            {club.description}
          </Text>

          <Box display="flex" justifyContent="center" width="100%">
            <DataListRoot orientation="horizontal" size="lg">
              <DataListItem label="Type" value={club.type} />
              <DataListItem
                label="Trophies"
                value={club.trophies.toLocaleString()}
              />
              <DataListItem
                label="Required Trophies"
                value={club.requiredTrophies.toLocaleString()}
              />
              <DataListItem
                label="Members"
                value={`${club.members.length}/30`}
              />
            </DataListRoot>
          </Box>

          <Heading fontSize="xl" textAlign="center">
            Club Members
          </Heading>

          <Table.ScrollArea
            borderWidth="1px"
            rounded="md"
            maxW="100%"
            overflowX="auto"
          >
            <Table.Root size="lg" interactive colorPalette="accent">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader minW="50px" scope="col" textAlign="start">
                    #
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="250px" scope="col">
                    Member
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="150px" scope="col">
                    Role
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="100px" scope="col" textAlign="end">
                    Trophies
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {club.members.map((member, index) => (
                  <Table.Row key={member.tag}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell display="flex" alignItems="center">
                      {playerIcons[member.icon.id] ? (
                        <LazyImage
                          src={playerIcons[member.icon.id]}
                          alt={member.name}
                          boxSize="35px"
                          mr={2}
                        />
                      ) : (
                        <Text>No Icon</Text>
                      )}
                      <VStack align="start">
                        <Link
                          href={`/player/${member.tag.replace("#", "")}`}
                          color={argbToRgba(member.nameColor)}
                          _hover={{
                            opacity: 0.8,
                            transform: "scale(1.1)",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {member.name}
                        </Link>
                        <Tag
                          size="sm"
                          variant="outline"
                          colorPalette="orange"
                          cursor="pointer"
                          mr={2}
                          onClick={() => {
                            navigator.clipboard.writeText(member.tag);
                            toaster.create({
                              title: "Player tag copied!",
                              type: "success",
                              duration: 2000,
                            });
                          }}
                        >
                          {member.tag}
                        </Tag>
                      </VStack>
                    </Table.Cell>
                    <Table.Cell>{formatRoleName(member.role)}</Table.Cell>
                    <Table.Cell textAlign="end">{member.trophies}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </VStack>
      </Box>
    </>
  );
};

export default ClubDetailsPage;
