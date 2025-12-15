import React, { useEffect, useState } from 'react';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import type { Tournament } from '../types';

interface PlayerMatch {
    id: string;
    name: string;
}

const playerNames = [
    'Azrael', 'Balthasar', 'Cypher', 'Dante', 'Ezekiel', 'Fenris', 'Gideon', 'Horus'
];

function generateMatchesFromTournament(tournament: Tournament) {
    // Flatten all matches and assign unique ids
    let id = 1;
    const matches: any[] = [];
    tournament.rounds.forEach((round, rIdx) => {
        round.matches.forEach((match, mIdx) => {
            matches.push({
                id: id.toString(),
                name: `Match ${id}`,
                nextMatchId: null, // Will be set later
                tournamentRoundText: `Round ${rIdx + 1}`,
                startTime: '',
                state: 'SCHEDULED',
                participants: [
                    match.player1 ? { id: match.player1, name: match.player1 } : null,
                    match.player2 ? { id: match.player2, name: match.player2 } : null
                ].filter(Boolean),
                winnerId: match.winner || null
            });
            id++;
        });
    });
    // Set nextMatchId for each match (for bracket connections)
    // For 8 players, 3 rounds: 4 QF, 2 SF, 1 Final
    if (matches.length === 7) {
        // QF: 0-3, SF: 4-5, Final: 6
        matches[0].nextMatchId = matches[4].id;
        matches[1].nextMatchId = matches[4].id;
        matches[2].nextMatchId = matches[5].id;
        matches[3].nextMatchId = matches[5].id;
        matches[4].nextMatchId = matches[6].id;
        matches[5].nextMatchId = matches[6].id;
    }
    return matches;
}

const BracketGLoot: React.FC = () => {
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [matches, setMatches] = useState<any[]>([]);

    useEffect(() => {
        fetch('/src/tournament/tournament.json')
            .then(res => res.json())
            .then((data) => {
                setTournament(data);
                setMatches(generateMatchesFromTournament(data));
            });
    }, []);

    if (!tournament || matches.length === 0) return <div>Loading bracket...</div>;

    return (
        <div style={{ width: '100%', height: 500 }}>
            <SingleEliminationBracket
                matches={matches}
                matchComponent={Match}
                svgWrapper={SVGViewer}
            />
        </div>
    );
};

export default BracketGLoot;
