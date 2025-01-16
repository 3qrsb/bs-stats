import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayerInfoPage from "./pages/PlayerInfoPage";
import Layout from "./components/layout/Layout";
import PlayerLeaderboardPage from "./pages/PlayerLeaderboardPage";

const App = () => {
  return (
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
        <Route
          path="/leaderboard/players"
          element={
            <Layout>
              <PlayerLeaderboardPage />{" "}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
