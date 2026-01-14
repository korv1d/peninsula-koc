import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import type { Player } from '../types';
import { PLAYER_NAMES } from '../constants/players';
import './ListsPage.css';

type DerivedMetricKey =
    | 'mostPointsInRound'
    | 'shortestGame'
    | 'shortestTurn';

type MetricKey = keyof Player | DerivedMetricKey;

type NumericPlayerKey = {
    [K in keyof Player]: Player[K] extends number ? K : never
}[keyof Player];

type Metric = {
    key: MetricKey;
    label: string;
    unit: string;
    isPercent?: boolean;
    isTime?: boolean;
};

const metrics: Metric[] = [
    { key: 'winrate', label: 'Winrate', unit: '%', isPercent: true },
    { key: 'mostEnemiesKilled', label: 'Most Enemies Killed', unit: 'models' },
    { key: 'greatestPointsDifference', label: 'Greatest Points Difference', unit: 'points' },
    { key: 'highestScore', label: 'Highest Score', unit: 'points' },
    { key: 'mostPointsInRound', label: 'Most Points in a Round', unit: 'points' },
    { key: 'shortestGame', label: 'Shortest Game', unit: '', isTime: true },
    { key: 'shortestTurn', label: 'Shortest Turn', unit: '', isTime: true },
    { key: 'mostCpInOneBr', label: 'Most CP spent in 1 turn', unit: 'CP'},
    { key: 'leastModelsLost', label: 'Least Models Lost', unit: 'models'},
];

// Converts "HH:MM:SS" or "MM:SS" → seconds
const timeStringToSeconds = (time: string | number): number => {
    if (!time || time === 0) return Infinity;
    const parts = (time as string).split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return Infinity;
};

const LeaderboardPage: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        Promise.all(
            PLAYER_NAMES.map(name =>
                fetch(`/players/${name}.json`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Failed to load ${name}.json (HTTP ${res.status})`);
                        }
                        return res.json();
                    })
            )
        )
            .then(setPlayers)
            .catch(err => {
                console.error('Leaderboard load failed:', err);
            });
    }, []);

    const getLeaderboardEntry = (metric: Metric) => {
        if (players.length === 0) return null;

        /* ---------- Time-based metrics ---------- */
        if (metric.isTime) {
            const times = players.map(p => ({
                player: p,
                seconds: timeStringToSeconds((p as any)[metric.key]),
                display: (p as any)[metric.key] as string
            }));

            const minSeconds = Math.min(...times.map(t => t.seconds));

            if (minSeconds === Infinity) {
                return (
                    <div className="leaderboard-entry" key={metric.key}>
                        {metric.label}: <span className="player-name">Unclaimed</span>
                    </div>
                );
            }

            const winners = times.filter(t => t.seconds === minSeconds);

            return (
                <div className="leaderboard-entry" key={metric.key}>
                    {metric.label}:{' '}
                    <span className="player-name">
                        {winners.length === 1 ? winners[0].player.name : 'Contested'}
                    </span>
                    {winners.length === 1 && ` (${winners[0].display})`}
                </div>
            );
        }

        /* ---------- Numeric metrics ---------- */
        const key = metric.key as NumericPlayerKey;
        let maxValue = Math.max(...players.map(p => p[key]));

        if (maxValue === 0) {
            return (
                <div className="leaderboard-entry" key={metric.key}>
                    {metric.label}: <span className="player-name">Unclaimed</span>
                </div>
            );
        }

        const topPlayers = players.filter(p => p[key] === maxValue);

        if (metric.isPercent) {
            maxValue = Math.round(maxValue * 1000) / 10;
        }

        return (
            <div className="leaderboard-entry" key={metric.key}>
                {metric.label}:{' '}
                <span className="player-name">
                    {topPlayers.length === 1 ? topPlayers[0].name : 'Contested'}
                </span>{' '}
                ({maxValue} {metric.unit})
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
