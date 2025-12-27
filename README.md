# Peninsula KoC Live Tracker

In the grim darkness of the far future, there is only war.

Visualize the matchups, lists, and rankings of the Warhammer 40,000 Peninsula King of the Colosseum league!

## Navigation

| Page        | Description                                                                 |
|------------ |---------------------------------------------------------------------------- |
| main        | Displays standings and player matchups, past and future.                    |
| leaderboard | Players can collect stats from their games. The top performers are honored.|
| lists       | View the submitted lists of all players.                                    |

## Backlog
- Leaderboard entries should display the highest score/best value even when Contested
- Expand tournament bracket from 8 players to however many exist
- Beautify tournament bracket

## Contributions

Help wanted! The technically inclined are welcome to contribute to this humble website.

## Testing

I test with `npm run dev`  

## Linting

I'm using eslint to lint.  
  
Install:  
`npm install --save-dev eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin`  
  
Lint:  
`npx eslint "src/**/*.{ts,tsx,js,jsx}"`


I have this typescript mainpage:

import React from 'react';
import NavBar from './NavBar';
import './MainPage.css';

import bannerLeft from '../assets/banner_left.png';
import bannerRight from '../assets/banner_right.png';
import TournamentBracket from './TournamentBracket';

const MainPage: React.FC = () => {
    return (
        <div className="main-bg">
            <NavBar />

            <div className="main-content">
                <img
                    src={bannerLeft}
                    alt="Left Banner"
                    className="marine-img left"
                />

                {/* ✅ MAIN-ONLY wrapper */}
                <div className="main-bracket-container">
                    <TournamentBracket />
                </div>

                <img
                    src={bannerRight}
                    alt="Right Banner"
                    className="marine-img right"
                />
            </div>
        </div>
    );
};

export default MainPage;


And would like to make the background image for this TournamentBracket object 50% transparent:

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
                            {/* <div className="vertical-line" /> */}
                            <Match node={child} />
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
    return (
        <div className="tournament-bracket">
            <Match node={tournamentData} />
        </div>
    );
};

export default TournamentBracket;


Right now my tournament-bracket css looks like this:
.tournament-bracket {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
}

/* Glow-on-hover effect */
.tournament-bracket .match-node {
    transition: border 0.2s, box-shadow 0.2s;
    border: 2px solid transparent;
}

.tournament-bracket .match-node:hover {
    border-color: #7ecfff;
    box-shadow: 0 0 8px #7ecfff99;
    cursor: pointer;
}

and my background.jpeg image is being used as the background:

.main-bracket-container {
    width: 100%;
    max-width: 1800px;
    min-width: 350px;
    min-height: 500px;

    padding: 2.5rem 4vw;
    margin: 0 auto;

    background-image:
        url('../assets/background.jpg'),
        linear-gradient(120deg,
            rgba(35, 36, 58, 0.25),
            rgba(24, 26, 36, 0.1));

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    border-radius: 18px;
    box-shadow: 0 4px 32px #000a;

    overflow: hidden;
}

What should I change to make my image 50% transparent?