import React, { useEffect, useState } from 'react';
import tournamentData from '../tournament/tournament.json';
import { PLAYER_NAMES } from '../constants/players';
import type { Player } from '../types';
import './TournamentBracket.css';

interface MatchNode {
    name: string;
    winner: string;
    children?: MatchNode[];
}

interface MatchProps {
    node: MatchNode;
    playersByName: Record<string, Player>;
}

const Match: React.FC<MatchProps> = ({ node, playersByName }) => {
    const hasChildren = node.children && node.children.length > 0;
    const player = node.name ? playersByName[node.name] : null;

    return (
        <div className="match-container">
            {hasChildren && (
                <div className="match-children">
                    {node.children!.map((child, idx) => (
                        <div key={idx} className="match-child-wrapper">
                            <Match node={child} playersByName={playersByName} />
                        </div>
                    ))}
                    <div className="horizontal-line" />
                </div>
            )}

            <div className="hover-container">
                <div className="match-node">
                    {node.winner || node.name || '?'}
                </div>

                {player && (
                    <div className="hover-card">
                        <pre>{player.list}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

const TournamentBracket: React.FC = () => {
    const [playersByName, setPlayersByName] = useState<Record<string, Player>>(
        {}
    );

    useEffect(() => {
        Promise.all(
            PLAYER_NAMES.map(name =>
                fetch(`/players/${name}.json`)
                    .then(res => (res.ok ? res.json() : null))
                    .then(data => (data ? [name, data] as const : null))
            )
        ).then(results => {
            const map: Record<string, Player> = {};
            results.forEach(entry => {
                if (entry) {
                    const [name, player] = entry;
                    map[name] = player;
                }
            });
            setPlayersByName(map);
        });
    }, []);

    return (
        <div className="tournament-bracket">
            <Match node={tournamentData} playersByName={playersByName} />
        </div>
    );
};

export default TournamentBracket;
