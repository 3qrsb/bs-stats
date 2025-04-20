import {
  Portal,
  Box,
  useBreakpointValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LazyImage from "@/components/LazyImage";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  alt?: string;
}

const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt = "Enlarged map view",
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) setLoaded(false);
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const maxW = useBreakpointValue({ base: "80vw", md: "80vw" });
  const maxH = useBreakpointValue({ base: "80vh", md: "80vh" });

  if (!isOpen || !imageUrl) return null;

  return (
    <Portal>
      <Box
        onClick={onClose}
        onTouchStart={onClose}
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="blackAlpha.700"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="overlay"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          maxW={maxW}
          h={maxH}
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!loaded && (
            <Center position="absolute" top="0" left="0" w="100%" h="100%">
              <Spinner size="xl" color="white" />
            </Center>
          )}
          <LazyImage
            src={imageUrl}
            alt={alt}
            maxW="100%"
            maxH="100%"
            objectFit="contain"
            border="2px solid white"
            borderRadius="lg"
            onLoad={() => setLoaded(true)}
          />
        </Box>
      </Box>
    </Portal>
  );
};

export default MapModal;
