import React from 'react';
import NavBar from './NavBar';
import './RulesPage.css';

const RulesPage: React.FC = () => {
    return (
        <div className="main-bg">
            <NavBar />

            <div className="rules-container">
                <h1>Rules</h1>

                <p><strong>Each match consists of a best of 3 series of games.</strong></p>

                <h2>Army Composition</h2>
                <ul>
                    <li>Each player must compose an army list not exceeding 500 points, with one character specified as Warlord.</li>
                    <li>No unit may contain a model with toughness 10 or higher.</li>
                    <li>Each list must contain two units of non-character Infantry.</li>
                    <li>No epic heroes.</li>
                    <li>Battleline units may advance, shoot, and perform actions on the same turn.</li>
                </ul>

                <h2>Logistics</h2>
                <ul>
                    <li>Players will play on the Play-on-Tabletop Colosseum board.</li>
                    <li>Deployment Zones extend 9 inches from a player's side of the field.</li>
                    <li>Players determine Attacker and Defender prior to the Read Mission Objectives setup step.</li>
                </ul>

                <p><strong>Primary Missions (Attacker chooses):</strong></p>
                <ul>
                    <li>TAKE AND HOLD</li>
                    <li>LINCHPIN</li>
                    <li>TERRAFORM</li>
                </ul>

                <p><strong>Mission Twists (Defender chooses):</strong></p>
                <ul>
                    <li>POINT BLANK</li>
                    <li>RUINSCAPE</li>
                    <li>LORDS OF WAR</li>
                    <li>ADEPT OR DIE</li>
                </ul>

                <ul>
                    <li>Challenger cards will be used in game.</li>
                    <li>Units that can infiltrate may not be deployed touching more than one No Man’s Land objective.</li>
                </ul>

                <h2>Terrain Rules</h2>
                <p>
                    All L-shaped terrain pieces and all straight terrain pieces are ruins. These ruins’
                    footprint is defined by the physical space in which they are in contact with the ground.
                    All Core Rules regarding ruins apply.
                </p>

                <p>
                    The Colosseum Walls are a special type of terrain. Models may claim cover from this terrain
                    as if it were a ruin.
                </p>

                <p>
                    Colosseum Walls are impassable except for Infantry, Beast, and Swarm models. These models
                    may pass through this terrain by reducing their movement by 4" (2" if the model has FLY).
                </p>

                <p>
                    The Colosseum Walls are considered to be 1.01" thick for engagement range and Sabotage
                    secondary purposes.
                </p>
            </div>
        </div>
    );
};

export default RulesPage;
