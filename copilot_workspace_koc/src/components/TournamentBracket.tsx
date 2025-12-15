import React from 'react';
import tournamentData from '../tournament/tournament.json';
import { players } from '../players';
import './TournamentBracket.css';

interface MatchNode {
    name: string;
    winner: string;
    children?: MatchNode[];
}

interface MatchProps {
    node: MatchNode;
}

const Match: React.FC<MatchProps> = ({ node }) => {
    const hasChildren = node.children && node.children.length > 0;
    const player = node.name ? players[node.name] : null;

    return (
        <div className="match-container">
            {hasChildren && (
                <div className="match-children">
                    {node.children!.map((child, idx) => (
                        <div key={idx} className="match-child-wrapper">
                            <div className="vertical-line" />
                            <Match node={child} />
                        </div>
                    ))}
                    <div className="horizontal-line" />
                </div>
            )}
            <div className="match-node" title={player?.list || undefined}>
                {node.winner || node.name || '?'}
            </div>
        </div>
    );
};

const TournamentBracket: React.FC = () => {
    return (
        <div className="tournament-bracket">
            <Match node={tournamentData} />
        </div>
    );
};

export default TournamentBracket;
