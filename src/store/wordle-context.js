import React from 'react';

export const WordleContext = React.createContext(
    {
        solution: '',
        gameOver: false,
        gameStatus: '',
    }
);