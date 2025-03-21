import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <Box textAlign="center" mt="8">
      <Text color="red.500" mb="4">
        {message}
      </Text>
      <Button onClick={onRetry} colorPalette="red">
        Retry
      </Button>
    </Box>
  );
};

export default ErrorState;