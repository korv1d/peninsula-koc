import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import NavBar from './NavBar';
import './RulesPage.css';

const RulesPage: React.FC = () => {
    const [markdown, setMarkdown] = useState('');
    const [error, setError] = useState<string | null>(null);

    console.log('RulesPage loaded!');

    useEffect(() => {
        // const url = `${import.meta.env.BASE_URL}assets/rules.md`;
        // console.log('FETCHING MARKDOWN FROM:', url);

        fetch('/rules.md')
            .then(res => {
                console.log('HTTP STATUS:', res.status);
                return res.text();
            })
            .then(text => {
                console.log('MARKDOWN RESPONSE (first 200 chars):', text.slice(0, 200));
                setMarkdown(text);
            })
            .catch(err => {
                console.error('MARKDOWN FETCH ERROR:', err);
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
