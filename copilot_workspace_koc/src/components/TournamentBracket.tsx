import React from 'react';
import tournamentData from '../tournament/tournament.json';
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
    return (
        <div className="match-container">
            {node.children && (
                <div className="match-children">
                    {node.children.map((child, idx) => (
                        <Match key={idx} node={child} />
                    ))}
                </div>
            )}
            <div className="match-node">{node.winner || node.name || '?'}</div>
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
