import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { motion } from "framer-motion";
import { ChartLine, Sword, Trophy, Users } from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  delay: number;
}

const MotionBox = motion.create(Box);

const Feature = ({
  title,
  description,
  icon,
  color,
  bgColor,
  delay,
}: FeatureProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={6}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        transition="all 0.3s"
        _hover={{
          shadow: "md",
          transform: "translateY(-5px)",
          borderColor: color,
        }}
      >
        <Flex
          w={12}
          h={12}
          align="center"
          justify="center"
          borderRadius="md"
          bg={bgColor}
          mb={4}
        >
          <Icon boxSize={6} color={color}>
            {React.createElement(icon)}
          </Icon>
        </Flex>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="sm">
          {description}
        </Text>
      </Box>
    </MotionBox>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Trophy,
      title: "Track Trophies",
      description: "Monitor your trophy progression",
      color: "yellow.500",
      bgColor: "yellow.100",
      delay: 0,
    },
    {
      icon: Sword,
      title: "Battle Log",
      description: "See recent matches and analyze your performance",
      color: "red.500",
      bgColor: "red.100",
      delay: 150,
    },
    {
      icon: Users,
      title: "Player Stats",
      description: "View detailed statistics of any Brawl Stars player",
      color: "blue.500",
      bgColor: "blue.100",
      delay: 300,
    },
    {
      icon: ChartLine,
      title: "Progress Tracking",
      description: "Track your improvement over time with visual charts",
      color: "green.500",
      bgColor: "green.100",
      delay: 450,
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="6xl">
        <VStack textAlign="center" mb={12}>
          <Box
            px={4}
            py={1}
            bg={useColorModeValue("cyan.50", "cyan.900")}
            color={useColorModeValue("cyan.600", "cyan.300")}
            fontSize="xl"
            fontWeight="semibold"
            textTransform="uppercase"
            borderRadius="full"
          >
            Features
          </Box>
          <Heading as="h2" size="xl" mb={4}>
            Everything You Need To Track Your Progress
          </Heading>
          <Text
            maxW="2xl"
            fontSize="lg"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Our platform gives you complete visibility into player statistics,
            battle history, and performance metrics.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="40px">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              bgColor={feature.bgColor}
              delay={feature.delay}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
