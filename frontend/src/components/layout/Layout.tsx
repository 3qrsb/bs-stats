import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Header />
      <Box as="main" minHeight="calc(100vh - 150px)" p={4}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
