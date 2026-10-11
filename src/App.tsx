
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import SecondariesProvider from './secondaries/SecondariesProvider';
// import LeaderboardPage from './components/LeaderboardPage';
// import ListsPage from './components/ListsPage';

const RulesPage = React.lazy(() => import('./components/RulesPage'));
const LeaderboardPage = React.lazy(() => import('./components/LeaderboardPage'));
const ListsPage = React.lazy(() => import('./components/ListsPage'));
const SecondariesPage = React.lazy(() => import('./components/SecondariesPage'));

const App: React.FC = () => {
  return (
    <SecondariesProvider>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/2nds" element={<SecondariesPage />} />
          </Routes>
        </React.Suspense>
      </Router>
    </SecondariesProvider>
  );
};

export default App;
