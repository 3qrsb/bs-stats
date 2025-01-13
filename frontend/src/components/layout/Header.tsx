import { Flex, Heading, Spacer, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const Header = () => {
  return (
    <Flex as="header" p={6} bg="teal.600" color="white" align="center">
      <Heading size="md">Brawl Stats</Heading>
      <Spacer />
      <Flex gap={4}>
        <Link>
          <ReactLink to="/leaderboard">Leaderboards</ReactLink>
        </Link>
        <Link>
          <ReactLink to="/maps">Maps</ReactLink>
        </Link>
        <Link>
          <ReactLink to="/game-modes">Game Modes</ReactLink>
        </Link>
        <Link>
          <ReactLink to="/brawlers">Brawlers</ReactLink>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
