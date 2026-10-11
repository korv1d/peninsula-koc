import { createContext, useContext, type Dispatch } from 'react';
import { SECONDARY_NAMES } from '../constants/secondaries';

export interface SecondariesState {
    deck: string[];
    hand: string[];
    discard: string[];
    completed: string[];
}

export type SecondariesAction =
    | { type: 'draw' }
    | { type: 'discard'; cards: string[] }
    | { type: 'complete'; cards: string[] }
    | { type: 'redraw'; cards: string[] };

/** Returns a Fisher-Yates shuffled copy of `cards`. */
export function shuffle<T>(cards: readonly T[]): T[] {
    const result = [...cards];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/** Fresh game: full shuffled deck, empty hand, discard, and completed piles. */
export function initialSecondariesState(): SecondariesState {
    return { deck: shuffle(SECONDARY_NAMES), hand: [], discard: [], completed: [] };
}

/** Moves cards between deck, hand, discard, and completed piles. */
export function secondariesReducer(state: SecondariesState, action: SecondariesAction): SecondariesState {
    switch (action.type) {
        case 'draw': {
            if (state.deck.length === 0) return state;
            const [top, ...rest] = state.deck;
            return { ...state, deck: rest, hand: [...state.hand, top] };
        }
        case 'discard':
            return {
                ...state,
                hand: state.hand.filter(card => !action.cards.includes(card)),
                discard: [...state.discard, ...action.cards],
            };
        case 'complete':
            return {
                ...state,
                hand: state.hand.filter(card => !action.cards.includes(card)),
                completed: [...state.completed, ...action.cards],
            };
        case 'redraw':
            return {
                ...state,
                hand: state.hand.filter(card => !action.cards.includes(card)),
                deck: shuffle([...state.deck, ...action.cards]),
            };
    }
}

export const SecondariesContext = createContext<{
    state: SecondariesState;
    dispatch: Dispatch<SecondariesAction>;
} | null>(null);

/** Accesses the in-memory secondary deck shared across all tabs. */
export function useSecondaries() {
    const ctx = useContext(SecondariesContext);
    if (!ctx) throw new Error('useSecondaries must be used inside SecondariesProvider');
    return ctx;
}

/** Public URL of a secondary mission's rules image. */
export function secondaryImageUrl(name: string): string {
    return `/secondaries/${encodeURIComponent(name)}.png`;
}
