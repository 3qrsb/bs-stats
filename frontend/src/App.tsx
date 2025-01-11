import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import PlayerInfoPage from "./pages/PlayerInfoPage";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />{" "}
              </Layout>
            }
          />
          <Route
            path="/player/:tag"
            element={
              <Layout>
                <PlayerInfoPage />{" "}
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
