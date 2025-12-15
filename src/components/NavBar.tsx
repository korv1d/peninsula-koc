import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
    const location = useLocation();
    return (
        <nav className="nav-bar">
            <ul>
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/">Main</Link>
                </li>
                <li className={location.pathname === '/leaderboard' ? 'active' : ''}>
                    <Link to="/leaderboard">Leaderboard</Link>
                </li>
                <li className={location.pathname === '/lists' ? 'active' : ''}>
                    <Link to="/lists">Lists</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
