import {
  Flex,
  Heading,
  Spacer,
  Link,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { RiArrowDropDownLine, RiMenuLine } from "react-icons/ri";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <Flex
      as="header"
      bg="gray.800"
      color="white"
      p={6}
      align="center"
      justify="space-between"
    >
      <Heading>
        <Link href="/" color="white">
          <Text>Brawcel</Text>
        </Link>
      </Heading>
      <Spacer />
      <Flex display={{ base: "none", md: "flex" }} gap={4} align="center">
        <MenuRoot>
          <MenuTrigger>
            <Link color="white">
              Leaderboards <RiArrowDropDownLine />
            </Link>
          </MenuTrigger>
          <MenuContent>
            <MenuItem asChild value="player-leaderboard">
              <a href="/leaderboard/global">Player Leaderboard</a>
            </MenuItem>
            <MenuItem asChild value="brawler-leaderboard">
              <a href="/leaderboard/brawler">Brawler Leaderboard</a>
            </MenuItem>
            <MenuItem asChild value="club-leaderboard">
              <a href="/leaderboard/club">Club Leaderboard</a>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
        <Link href="/maps" color="white">
          Maps
        </Link>
        <Link href="/rotation" color="white">
          Rotation
        </Link>
        <Link href="/brawlers" color="white">
          Brawlers
        </Link>
        <ColorModeButton variant="plain" color="white" />
      </Flex>

      {/*Hamburger menu for smaller screens*/}
      <DrawerRoot size="xs" open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            aria-label="Open menu"
            display={{ base: "flex", md: "none" }}
            color="white"
            bg="gray.800"
          >
            <RiMenuLine />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent bg="gray.800" color="white">
          <DrawerCloseTrigger color="white" />
          <DrawerBody>
            <Box mb={4} mt={2}>
              <Link href="/leaderboard/global" color="white">
                Player Leaderboard
              </Link>
            </Box>
            <Box mb={4}>
              <Link href="/leaderboard/brawler" color="white">
                Brawler Leaderboard
              </Link>
            </Box>
            <Box mb={4}>
              <Link href="/leaderboard/club" color="white">
                Club Leaderboard
              </Link>
            </Box>
            <Box mb={4}>
              <Link href="/maps" color="white">
                Maps
              </Link>
            </Box>
            <Box mb={4}>
              <Link href="/rotation" color="white">
                Rotation
              </Link>
            </Box>
            <Box mb={4}>
              <Link href="/brawlers" color="white">
                Brawlers
              </Link>
            </Box>
            <ColorModeButton variant="plain" color="white" />
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
};

export default Header;
