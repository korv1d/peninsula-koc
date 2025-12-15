import React, { useEffect, useState } from 'react';
import type { Tournament, Player } from '../types';
import './TournamentBracket.css';

interface BracketProps {
    tournamentFile: string;
    playersDir: string;
}

const TournamentBracket: React.FC<BracketProps> = ({ tournamentFile, playersDir }) => {
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [players, setPlayers] = useState<Record<string, Player>>({});
    const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

    useEffect(() => {
        fetch(tournamentFile)
            .then(res => res.json())
            .then(setTournament);
        // Load all player files
        const playerNames = [
            'Azrael', 'Balthasar', 'Cypher', 'Dante', 'Ezekiel', 'Fenris', 'Gideon', 'Horus'
        ];
        Promise.all(
            playerNames.map(name =>
                fetch(`${playersDir}/${name}.json`).then(res => res.json()).then((data) => [name, data])
            )
        ).then(entries => setPlayers(Object.fromEntries(entries)));
    }, [tournamentFile, playersDir]);

    if (!tournament) return <div>Loading bracket...</div>;

    // Helper to render a player cell with hover tile

    const playerNames = [
        'Azrael', 'Balthasar', 'Cassandra', 'Dorian',
        'Elara', 'Fynn', 'Gideon', 'Helena',
    ];

    const roundLabels = [
        'Quarterfinal 1',
        'Quarterfinal 2',
        'Quarterfinal 3',
        'Quarterfinal 4',
    ];

    const TournamentBracket: React.FC = () => {
        return (
            <div className="custom-bracket-container">
                <div className="bracket-side bracket-left">
                    {playerNames.slice(0, 4).map((name, idx) => (
                        <div key={name} className="bracket-player-tile">
                            <span className="bracket-player-name">{name}</span>
                            <div className="bracket-round-label">{roundLabels[idx]}</div>
                        </div>
                    ))}
                </div>
                <div className="bracket-menu-center">
                    <div className="bracket-menu-title">Tournament Bracket</div>
                    {/* Add bracket lines and logic here for next rounds if desired */}
                </div>
                <div className="bracket-side bracket-right">
                    {playerNames.slice(4, 8).map((name, idx) => (
                        <div key={name} className="bracket-player-tile">
                            <span className="bracket-player-name">{name}</span>
                            <div className="bracket-round-label">{roundLabels[idx]}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    export default TournamentBracket;
};

export default TournamentBracket;
