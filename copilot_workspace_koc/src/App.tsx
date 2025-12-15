
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
// import LeaderboardPage from './components/LeaderboardPage';
// import ListsPage from './components/ListsPage';

const LeaderboardPage = React.lazy(() => import('./components/LeaderboardPage'));
const ListsPage = React.lazy(() => import('./components/ListsPage'));

const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/lists" element={<ListsPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
