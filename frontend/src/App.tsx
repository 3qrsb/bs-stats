import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayerInfoPage from "./pages/PlayerInfoPage";
import Layout from "./components/layout/Layout";
import PlayerLeaderboardPage from "./pages/PlayerLeaderboardPage";
import ClubLeaderboardPage from "./pages/ClubLeaderboard";
import ClubDetailsPage from "./pages/details/ClubDetailsPage";

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
          path="/club/:clubTag"
          element={
            <Layout>
              <ClubDetailsPage />{" "}
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
        <Route
          path="/leaderboard/clubs"
          element={
            <Layout>
              <ClubLeaderboardPage />{" "}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
