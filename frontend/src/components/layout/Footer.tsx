import { Box, Text, Flex, Link } from "@chakra-ui/react";
import FacebookIcon from "../icons/FacebookIcon";
import XIcon from "../icons/XIcon";
import InstagramIcon from "../icons/InstagramIcon";

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
          <Link href="https://www.facebook.com" aria-label="Facebook">
            <FacebookIcon width={24} height={24} />
          </Link>
          <Link href="https://www.twitter.com" aria-label="Twitter (X)">
            <XIcon width={24} height={24} />
          </Link>
          <Link href="https://www.instagram.com" aria-label="Instagram">
            <InstagramIcon width={24} height={24} />
          </Link>
        </Flex>

        <Flex gap={4}>
          <Link href="/privacy-policy" color="white">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" color="white">
            Terms of Service
          </Link>
          <Link href="/contact" color="white">
            Contact
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
