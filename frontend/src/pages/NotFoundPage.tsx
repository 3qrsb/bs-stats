import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
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
  );
};

export default NotFoundPage;
