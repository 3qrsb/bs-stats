import { Link } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import SEO from "@/components/SEO";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found | Brawl Stars Stats"
        description="Oops! The page you're looking for doesn't exist. Go back to the homepage or check out other parts of the site."
      />
         
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={4}
      >
        <Heading as="h1" size="4xl" mb={4}>
          404
        </Heading>
        <Text fontSize="xl" mb={4}>
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Link to="/">
          <Button colorPalette="cyan" variant="subtle" size="lg">
            Go back to Home
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFoundPage;
