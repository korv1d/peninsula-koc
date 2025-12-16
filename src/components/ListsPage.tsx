
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import type { Player } from '../types';
import './ListsPage.css';

const playerNames = [
    'Anthony', 'Ayden', 'Belisarius', 'Ben', 'Gabe', 'Ian', 'Nate', 'Roman'
];

const ListsPage: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        Promise.all(
            playerNames.map(name =>
                fetch(`/src/players/${name}.json`).then(res => res.json())
            )
        ).then(setPlayers);
    }, []);

    return (
        <div className="main-bg">
            <NavBar />
            <div className="bracket-container">
                <h1>Player Lists</h1>
                <div className="lists-grid">
                    {players.map((player, idx) => (
                        <div className="list-tile" key={player.name}>
                            <div className="list-tile-header">{player.name}</div>
                            <div className="list-tile-scroll">
                                <pre>{player.list}</pre>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListsPage;
