import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import PlayerLeaderboardPage from "./pages/leaderboard/PlayerLeaderboardPage";
import ClubLeaderboardPage from "./pages/leaderboard/ClubLeaderboardPage";
import ClubDetailsPage from "./pages/details/ClubDetailsPage";
import PlayerDetailsPage from "./pages/details/PlayerDetailsPage";
import BattleLogPage from "./pages/details/BattleLogPage";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/player/:tag"
            element={
              <Layout>
                <PlayerDetailsPage />
              </Layout>
            }
          />
          <Route
            path="/player/:tag/battlelog"
            element={
              <Layout>
                <BattleLogPage />
              </Layout>
            }
          />
          <Route
            path="/club/:clubTag"
            element={
              <Layout>
                <ClubDetailsPage />
              </Layout>
            }
          />
          <Route
            path="/leaderboard/players"
            element={
              <Layout>
                <PlayerLeaderboardPage />
              </Layout>
            }
          />
          <Route
            path="/leaderboard/clubs"
            element={
              <Layout>
                <ClubLeaderboardPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
