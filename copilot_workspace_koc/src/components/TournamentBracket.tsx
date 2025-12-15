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
    const renderPlayer = (playerName?: string) => (
        <div className="bracket-player">
            {playerName ? (
                <span
                    className="player-name"
                    onMouseEnter={() => setHoveredPlayer(playerName)}
                    onMouseLeave={() => setHoveredPlayer(null)}
                >
                    {playerName}
                </span>
            ) : <span className="empty-slot">TBD</span>}
            {hoveredPlayer === playerName && players[playerName!] && (
                <div className="player-tile">
                    <div className="player-list-scroll">
                        <pre>{players[playerName!].list}</pre>
                    </div>
                </div>
            )}
        </div>
    );

    // Classic bracket layout for 8 players, 3 rounds
    return (
        <div className="tournament-bracket-classic">
            {/* Round 1 */}
            <div className="bracket-col">
                <div className="round-label">Quarterfinals</div>
                {tournament.rounds[0].matches.map((match, i) => (
                    <div className="bracket-cell" key={i}>
                        {renderPlayer(match.player1)}
                        <div className="vs">vs</div>
                        {renderPlayer(match.player2)}
                    </div>
                ))}
            </div>
            {/* Connectors between rounds */}
            <div className="bracket-connector-col">
                <div className="bracket-connector-group">
                    <div className="bracket-connector" />
                </div>
                <div className="bracket-connector-group">
                    <div className="bracket-connector" />
                </div>
            </div>
            {/* Round 2 */}
            <div className="bracket-col">
                <div className="round-label">Semifinals</div>
                {tournament.rounds[1].matches.map((match, i) => (
                    <div className="bracket-cell" key={i}>
                        {renderPlayer(match.player1)}
                        <div className="vs">vs</div>
                        {renderPlayer(match.player2)}
                    </div>
                ))}
            </div>
            <div className="bracket-connector-col">
                <div className="bracket-connector-group">
                    <div className="bracket-connector" />
                </div>
            </div>
            {/* Round 3 */}
            <div className="bracket-col">
                <div className="round-label">Final</div>
                {tournament.rounds[2].matches.map((match, i) => (
                    <div className="bracket-cell" key={i}>
                        {renderPlayer(match.player1)}
                        <div className="vs">vs</div>
                        {renderPlayer(match.player2)}
                        {match.winner && <div className="winner-label">Winner: {match.winner}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TournamentBracket;
