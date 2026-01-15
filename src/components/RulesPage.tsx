import React from 'react';
import ReactMarkdown from 'react-markdown';
import NavBar from './NavBar';
import './RulesPage.css';
import rulesMarkdown from '../assets/rules.md?raw';

const RulesPage: React.FC = () => {
    return (
        <div className="rules-page-container">
            <NavBar />

            <div className="rules-page-content">
                <ReactMarkdown>{rulesMarkdown}</ReactMarkdown>
            </div>
        </div>
    );
};

export default RulesPage;
