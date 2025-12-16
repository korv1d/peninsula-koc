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

                <TournamentBracket />

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
