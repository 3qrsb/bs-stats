import { Box, Text, Flex, Link, Icon } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={6}
      textAlign="center"
      width="100%"
    >
      <Flex direction="column" align="center" gap={4}>
        <Text fontSize="md" color="gray.400">
          <Text as="span" fontWeight="bold">
            Brawcel
          </Text>{" "}
          &copy; {new Date().getFullYear()} All rights reserved.
        </Text>

        <Text fontSize="sm" color="gray.400" textAlign="center">
          This content is not affiliated with, endorsed, sponsored, or
          specifically approved by Supercell and Supercell is not responsible
          for it. For more information see{" "}
          <Link
            color="white"
            href="https://www.supercell.com/fan-content-policy"
          >
            Supercell's Fan Content Policy.
          </Link>
        </Text>

        <Flex gap={4} justify="center">
          <Link href="https://www.facebook.com">
            <Icon w={6} h={6} color="white" _hover={{ color: "blue.500" }}>
              <FaFacebook />
            </Icon>
          </Link>
          <Link href="https://www.twitter.com">
            <Icon w={6} h={6} color="white" _hover={{ color: "blue.400" }}>
              <FaTwitter />
            </Icon>
          </Link>
          <Link href="https://www.instagram.com">
            <Icon w={6} h={6} color="white" _hover={{ color: "pink.500" }}>
              <FaInstagram />
            </Icon>
          </Link>
        </Flex>

        <Flex gap={4} justify="center">
          <Link
            href="/privacy-policy"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Contact
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
