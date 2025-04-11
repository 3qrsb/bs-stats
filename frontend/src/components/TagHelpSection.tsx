import { HelpCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, Text, Stack, Box, HStack } from "@chakra-ui/react";
import LazyImage from "./LazyImage";

const MotionBox = motion.create(Box);

const TagHelpSection = () => {
  const helpItems = [
    {
      id: "player-tag",
      title: "Where is my Player Tag?",
      text: "Your player tag is located just below your profile icon. It’s a unique code starting with a # that identifies your account.",
      image: "/images/help1.webp",
    },
    {
      id: "club-tag",
      title: "Where is my Club Tag?",
      text: "You can find your club tag on the main club page, just below the club description. It also begins with a #.",
      image: "/images/help2.webp",
    },
  ];

  return (
    <Stack gap={6} mt={8} align="center">
      <HStack justify="center">
        <HelpCircleIcon size={20} />
        <Text fontWeight="medium" fontSize="lg" textAlign="center">
          Need help finding your Tag?
        </Text>
      </HStack>

      <Tabs.Root
        fitted
        composite
        colorPalette="cyan"
        variant="outline"
        lazyMount
        unmountOnExit
        defaultValue={helpItems[0].id}
        orientation="horizontal"
      >
        <Tabs.List justifyContent="center" gap={4}>
          {helpItems.map((item) => (
            <Tabs.Trigger
              key={item.id}
              value={item.id}
              px={4}
              py={2}
              fontWeight="semibold"
            >
              {item.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {helpItems.map((item) => (
          <Tabs.Content key={item.id} value={item.id} mt={4}>
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              maxW="700px"
              textAlign="left"
            >
              <Text mb={3}>{item.text}</Text>
              <LazyImage
                src={item.image}
                alt={item.title}
                borderRadius="md"
                maxW="100%"
              />
            </MotionBox>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Stack>
  );
};

export default TagHelpSection;
