import React, { useReducer } from 'react';
import { SecondariesContext, initialSecondariesState, secondariesReducer } from './secondariesState';

/** Holds the secondary deck in memory for the whole session; a page refresh starts a new game. */
const SecondariesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(secondariesReducer, undefined, initialSecondariesState);
    return (
        <SecondariesContext.Provider value={{ state, dispatch }}>
            {children}
        </SecondariesContext.Provider>
    );
};

export default SecondariesProvider;
