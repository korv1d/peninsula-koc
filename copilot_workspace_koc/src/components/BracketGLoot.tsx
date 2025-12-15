import React from 'react';
import './TournamentBracket.css';

const playerNames = [
    'Azrael', 'Balthasar', 'Cassandra', 'Dorian',
    'Elara', 'Fynn', 'Gideon', 'Helena',
];

const roundLabels = [
    'Quarterfinal 11',
    'Quarterfinal 2',
    'Quarterfinal 3',
    'Quarterfinal 4',
];

const BracketGLoot: React.FC = () => {
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
                {/* <div className="bracket-menu-title">Tournament Bracket</div> */}
                {/* You can add more bracket logic or visuals here */}
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

export default BracketGLoot;
