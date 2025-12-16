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
    isTime?: boolean; // For HH:MM:SS metrics
};

const metrics: Metric[] = [
    { key: 'winrate', label: 'Winrate', unit: '%', isPercent: true },
    { key: 'mostEnemiesKilled', label: 'Most Enemies Killed', unit: 'models' },
    { key: 'greatestPointsDifference', label: 'Greatest Points Difference', unit: 'points' },
    { key: 'highestScore', label: 'Highest Score', unit: 'points' },
    { key: 'mostPointsInRound', label: 'Most Points in a Round', unit: 'points' },
    { key: 'shortestGame', label: 'Shortest Game', unit: '', isTime: true },
    { key: 'shortestTurn', label: 'Shortest Turn', unit: '', isTime: true }
];

// Helper to convert "HH:MM:SS" or "MM:SS" → seconds
const timeStringToSeconds = (time: string | number): number => {
    if (!time || time === 0) return Infinity; // treat 0 or empty string as unclaimed
    const parts = (time as string).split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
};

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

        console.log(metric.key, players.map(p => p[metric.key]));

        // Handle shortestGame / shortestTurn separately
        if (metric.key === 'shortestGame' || metric.key === 'shortestTurn') {
            const timeStringToSeconds = (time: string | number): number => {
                if (!time || time === 0) return Infinity; // treat 0 or empty as unclaimed
                const parts = (time as string).split(':').map(Number);
                if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
                if (parts.length === 2) return parts[0] * 60 + parts[1];
                return 0;
            };

            const minValue = Math.min(
                ...players.map(p => timeStringToSeconds(p[metric.key]))
            );

            if (minValue === Infinity) {
                return (
                    <div className="leaderboard-entry" key={metric.key}>
                        {metric.label}: <span className="player-name">Unclaimed</span>
                    </div>
                );
            }

            const topPlayers = players.filter(
                p => timeStringToSeconds(p[metric.key]) === minValue
            );
            const displayValue = topPlayers[0][metric.key];

            return (
                <div className="leaderboard-entry" key={metric.key}>
                    {metric.label}: <span className="player-name">
                        {topPlayers.length === 1 ? topPlayers[0].name : 'Contested'}
                    </span> ({displayValue})
                </div>
            );
        }

        // Handle numeric metrics
        let maxValue = Math.max(...players.map(p => p[metric.key] as number));

        if (maxValue === 0) {
            return (
                <div className="leaderboard-entry" key={metric.key}>
                    {metric.label}: <span className="player-name">Unclaimed</span>
                </div>
            );
        }

        const topPlayers = players.filter(p => p[metric.key] === maxValue);

        if (metric.isPercent) {
            maxValue = Math.round(maxValue * 1000) / 10; // e.g. 0.75 -> 75.0
        }

        return (
            <div className="leaderboard-entry" key={metric.key}>
                {metric.label}: <span className="player-name">
                    {topPlayers.length === 1 ? topPlayers[0].name : 'Contested'}
                </span> ({maxValue} {metric.unit})
            </div>
        );
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
