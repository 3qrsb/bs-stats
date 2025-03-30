import { Image, ImageProps } from "@chakra-ui/react";

const LazyImage = (props: ImageProps) => {
  return <Image loading="lazy" {...props} />;
};

export default LazyImage;
