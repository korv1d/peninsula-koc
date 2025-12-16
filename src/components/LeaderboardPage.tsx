
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import type { Player } from '../types';
import './ListsPage.css';

const playerNames = [
    'Anthony', 'Ayden', 'Belisarius', 'Ben', 'Gabe', 'Ian', 'Nate', 'Roman'
];

type Metric = {
    key: keyof Player;
    label: string;
    unit: string;
    isPercent?: boolean;
};

const metrics: Metric[] = [
    { key: 'winrate', label: 'Winrate', unit: '%', isPercent: true },
    { key: 'mostEnemiesKilled', label: 'Most Enemies Killed', unit: 'models' },
    { key: 'greatestPointsDifference', label: 'Greatest Points Difference', unit: 'points' },
    { key: 'highestScore', label: 'Highest Score', unit: 'points' },
    { key: 'mostPointsInRound', label: 'Most Points in a Round', unit: 'points' },
    { key: 'shortestGame', label: 'Shortest Game', unit: 'turns' },
    { key: 'shortestTurn', label: 'Shortest Turn', unit: 'seconds' }
];

const LeaderboardPage: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        Promise.all(
            playerNames.map(name =>
                fetch(`/src/players/${name}.json`).then(res => res.json())
            )
        ).then(setPlayers);
    }, []);

    const getLeaderboardEntry = (metric: Metric) => {
        if (players.length === 0) return null;

        // Get the maximum value for this metric
        let maxValue = Math.max(...players.map(p => p[metric.key] as number));

        // Convert to percentage if needed
        if (metric.isPercent) maxValue = Math.round(maxValue * 1000) / 10; // e.g. 0.75 -> 75.0

        // Handle the case where no player has a value > 0
        if (maxValue === 0) {
            return (
                <div className="leaderboard-entry" key={metric.key}>
                    {metric.label}: <span className="player-name">Unclaimed</span>
                </div>
            );
        }

        // Find players with the top value
        const topPlayers = players.filter(p => p[metric.key] === (metric.isPercent ? maxValue / 100 : maxValue));

        if (topPlayers.length === 1) {
            return (
                <div className="leaderboard-entry" key={metric.key}>
                    {metric.label}: <span className="player-name">{topPlayers[0].name}</span> ({maxValue} {metric.unit})
                </div>
            );
        } else {
            return (
                <div className="leaderboard-entry" key={metric.key}>
                    {metric.label}: <span className="player-name">Contested</span> ({maxValue} {metric.unit})
                </div>
            );
        }
    };

    return (
        <div className="main-bg">
            <NavBar />
            <div className="bracket-container">
                <h1>Leaderboard</h1>
                <div className="leaderboard-list">
                    {metrics.map(getLeaderboardEntry)}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
