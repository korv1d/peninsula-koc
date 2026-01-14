import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import NavBar from './NavBar';
import './RulesPage.css';

const RulesPage: React.FC = () => {
    const [markdown, setMarkdown] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}assets/rules.md`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch rules.md: ${res.status}`);
                }
                return res.text();
            })
            .then(setMarkdown)
            .catch(err => {
                console.error(err);
                setMarkdown('Failed to load rules.');
            });
    }, []);

    return (
        <div className="main-bg">
            <NavBar />

            <div className="bracket-container rules-container">
                {error && <p className="error-text">{error}</p>}
                {!markdown && !error && <p>Loading rules…</p>}

                {markdown && (
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default RulesPage;
