import React from 'react';
import NavBar from './NavBar';

const LeaderboardPage: React.FC = () => {
    return (
        <div className="main-bg">
            <NavBar />
            <div className="bracket-container">
                <h1>Leaderboard</h1>
                <div>Leaderboard content will go here.</div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
