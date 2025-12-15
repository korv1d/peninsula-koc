import React from 'react';
import NavBar from './NavBar';
import './MainPage.css';

import leftMarine from '../assets/space_marine_left.png';
import rightMarine from '../assets/space_marine_right.png';
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
// Example matches data for demonstration
const exampleMatches = [
    {
        id: '1',
        name: 'Quarterfinal 1',
        nextMatchId: '5',
        tournamentRoundText: 'Quarterfinals',
        startTime: '',
        state: 'SCHEDULED',
        participants: [
            { id: 'p1', name: 'Azrael' },
            { id: 'p2', name: 'Balthasar' }
        ],
        winnerId: null
    },
    {
        id: '2',
        name: 'Quarterfinal 2',
        nextMatchId: '5',
        tournamentRoundText: 'Quarterfinals',
        startTime: '',
        state: 'SCHEDULED',
        participants: [
            { id: 'p3', name: 'Cypher' },
            { id: 'p4', name: 'Dante' }
        ],
        winnerId: null
    },
    {
        id: '3',
        name: 'Quarterfinal 3',
        nextMatchId: '6',
        tournamentRoundText: 'Quarterfinals',
        startTime: '',
        state: 'SCHEDULED',
        participants: [
            { id: 'p5', name: 'Ezekiel' },
            { id: 'p6', name: 'Fenris' }
        ],
        winnerId: null
    },
    {
        id: '4',
        name: 'Quarterfinal 4',
        nextMatchId: '6',
        tournamentRoundText: 'Quarterfinals',
        startTime: '',
        state: 'SCHEDULED',
        participants: [
            { id: 'p7', name: 'Gideon' },
            { id: 'p8', name: 'Horus' }
        ],
        winnerId: null
    },
    {
        id: '5',
        name: 'Semifinal 1',
        nextMatchId: '7',
        tournamentRoundText: 'Semifinals',
        startTime: '',
        state: 'SCHEDULED',
        participants: [],
        winnerId: null
    },
    {
        id: '6',
        name: 'Semifinal 2',
        nextMatchId: '7',
        tournamentRoundText: 'Semifinals',
        startTime: '',
        state: 'SCHEDULED',
        participants: [],
        winnerId: null
    },
    {
        id: '7',
        name: 'Final',
        nextMatchId: null,
        tournamentRoundText: 'Final',
        startTime: '',
        state: 'SCHEDULED',
        participants: [],
        winnerId: null
    }
];

const MainPage: React.FC = () => {
    return (
        <div className="main-bg">
            <NavBar />
            <div className="main-content">
                <img src={leftMarine} alt="Space Marine Left" className="marine-img left" />
                <div className="bracket-container">
                    <h1>Tournament Bracket</h1>
                                {/* Example Single Elimination Bracket */}
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 800 }}>
                                                <SingleEliminationBracket
                                                    matches={exampleMatches}
                                                    matchComponent={Match}
                                                    svgWrapper={({ children, ...props }) => (
                                                        <SVGViewer width={1200} height={700} {...props}>
                                                            {children}
                                                        </SVGViewer>
                                                    )}
                                                />
                                            </div>
                                {/* Example Double Elimination Bracket (optional, can remove if not needed) */}
                                {/*
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 600 }}>
                                    <DoubleEliminationBracket
                                        matches={exampleMatches}
                                        matchComponent={Match}
                                        svgWrapper={({ children, ...props }) => (
                                            <SVGViewer width={500} height={500} {...props}>
                                                {children}
                                            </SVGViewer>
                                        )}
                                    />
                                </div>
                                */}
                </div>
                <img src={rightMarine} alt="Space Marine Right" className="marine-img right" />
            </div>
        </div>
    );
};

export default MainPage;
