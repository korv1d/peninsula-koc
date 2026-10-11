import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { secondaryImageUrl, useSecondaries } from '../secondaries/secondariesState';
import './SecondariesPage.css';

type SelectMode = 'score' | 'redraw' | 'discard';
type PileKey = 'completed' | 'discard';

const MODE_LABELS: Record<SelectMode, string> = {
    score: 'Score',
    redraw: 'Redraw',
    discard: 'Discard',
};

const MODE_ACTIONS: Record<SelectMode, 'complete' | 'redraw' | 'discard'> = {
    score: 'complete',
    redraw: 'redraw',
    discard: 'discard',
};

const PILES: Record<PileKey, { title: string; iconPath: string }> = {
    completed: {
        title: 'Completed',
        iconPath: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z',
    },
    discard: {
        title: 'Discard pile',
        iconPath: 'M9 3h6l1 2h4v2H4V5h4l1-2zm-3 6h12l-1 12H7L6 9zm4 2v8h1.5v-8H10zm3.5 0v8H15v-8h-1.5z',
    },
};

/** Full-screen view of a secondary's rules image. */
const CardViewer: React.FC<{ name: string; onClose: () => void }> = ({ name, onClose }) => (
    <div className="sec-viewer">
        <img src={secondaryImageUrl(name)} alt={name} />
        <button className="sec-close" onClick={onClose} aria-label="Close">✕</button>
    </div>
);

/** Mobile-first secondary mission tracker: hand, draw/score/redraw/discard controls, and completed/discard piles. */
const SecondariesPage: React.FC = () => {
    const { state, dispatch } = useSecondaries();
    const [mode, setMode] = useState<SelectMode | null>(null);
    const [selected, setSelected] = useState<string[]>([]);
    const [viewing, setViewing] = useState<string | null>(null);
    const [openPile, setOpenPile] = useState<PileKey | null>(null);

    // Locks the document so the page can't scroll while this tab is open.
    useEffect(() => {
        document.documentElement.classList.add('sec-no-scroll');
        return () => document.documentElement.classList.remove('sec-no-scroll');
    }, []);

    const handleModeButton = (target: SelectMode) => {
        if (mode !== target) {
            setMode(target);
            setSelected([]);
            return;
        }
        if (selected.length > 0) {
            dispatch({ type: MODE_ACTIONS[target], cards: selected });
        }
        setMode(null);
        setSelected([]);
    };

    const handleCardClick = (card: string) => {
        if (!mode) {
            setViewing(card);
            return;
        }
        setSelected(prev => prev.includes(card) ? prev.filter(c => c !== card) : [...prev, card]);
    };

    const modeButton = (target: SelectMode) => (
        <button
            className={`sec-btn sec-btn-${target}${mode === target ? ' confirming' : ''}`}
            disabled={mode !== null && mode !== target}
            onClick={() => handleModeButton(target)}
        >
            {mode === target ? 'Confirm' : MODE_LABELS[target]}
        </button>
    );

    const pileButton = (pile: PileKey) => (
        <button className={`sec-pile-btn sec-pile-${pile}`} onClick={() => setOpenPile(pile)} aria-label={PILES[pile].title}>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path fill="currentColor" d={PILES[pile].iconPath} />
            </svg>
            {state[pile].length > 0 && <span className="sec-pile-count">{state[pile].length}</span>}
        </button>
    );

    return (
        <div className="sec-page">
            <NavBar />

            <div className="sec-content">
                <div className={`sec-hand${state.hand.length > 8 ? ' crowded' : ''}`}>
                    {state.hand.length === 0 && <div className="sec-empty">No secondaries in hand</div>}
                    {state.hand.map((card, i) => {
                        const isSelected = selected.includes(card);
                        const wiggling = mode !== null && !isSelected;
                        return (
                            <button
                                key={card}
                                className={`sec-card${wiggling ? ' wiggle' : ''}${isSelected ? ' selected' : ''}`}
                                style={wiggling ? { animationDelay: `${(i % 3) * -0.09}s` } : undefined}
                                onClick={() => handleCardClick(card)}
                            >
                                {card}
                            </button>
                        );
                    })}
                </div>

                <div className="sec-controls">
                    <button
                        className="sec-btn sec-btn-draw"
                        disabled={mode !== null || state.deck.length === 0}
                        onClick={() => dispatch({ type: 'draw' })}
                    >
                        {state.deck.length === 0 ? 'Deck empty' : 'Draw'}
                    </button>
                    {modeButton('score')}
                    {modeButton('redraw')}
                    {modeButton('discard')}
                </div>

                <div className="sec-footer">
                    <span className="sec-deck-count">Deck: {state.deck.length}</span>
                    <div className="sec-piles">
                        {pileButton('completed')}
                        {pileButton('discard')}
                    </div>
                </div>
            </div>

            {openPile && (
                <div className="sec-modal-backdrop" onClick={() => setOpenPile(null)}>
                    <div className="sec-modal" onClick={e => e.stopPropagation()}>
                        <div className="sec-modal-header">
                            <span>{PILES[openPile].title}</span>
                            <button className="sec-modal-close" onClick={() => setOpenPile(null)} aria-label="Close">✕</button>
                        </div>
                        <div className="sec-modal-list">
                            {state[openPile].length === 0 && <div className="sec-empty">No cards here yet</div>}
                            {state[openPile].map(card => (
                                <button key={card} className="sec-card" onClick={() => setViewing(card)}>
                                    {card}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {viewing && <CardViewer name={viewing} onClose={() => setViewing(null)} />}
        </div>
    );
};

export default SecondariesPage;
