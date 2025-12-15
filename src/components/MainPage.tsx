import React from 'react';
import NavBar from './NavBar';
import './MainPage.css';

import leftMarine from '../assets/space_marine_left.png';
import rightMarine from '../assets/space_marine_right.png';
import TournamentBracket from './TournamentBracket';

const MainPage: React.FC = () => {
    return (
        <div className="main-bg">
            <NavBar />
            <div className="main-content">
                <img src={leftMarine} alt="Space Marine Left" className="marine-img left" />
                <TournamentBracket />
                <img src={rightMarine} alt="Space Marine Right" className="marine-img right" />
            </div>
        </div>
    );
};

export default MainPage;
