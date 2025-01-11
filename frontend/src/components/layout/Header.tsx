import { Flex, Heading, Spacer, Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Flex as="header" p={4} bg="teal.500" color="white" align="center">
      <Heading size="md">Brawl Stats</Heading>
      <Spacer />
      <Flex gap={4}>
        <Link as={RouterLink} href="/" fontWeight="bold">
          Home
        </Link>
        <Link as={RouterLink} href="/leaderboard" fontWeight="bold">
          Leaderboard
        </Link>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => alert("Theme toggle")}
        >
          Toggle Theme
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
