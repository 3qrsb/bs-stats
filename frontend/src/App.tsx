import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import PlayerInfoPage from "./pages/PlayerInfoPage";

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:tag" element={<PlayerInfoPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
