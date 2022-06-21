import React, { useState } from "react";
import { WordleContext } from "./wordle-context";
import { dictionary } from "./dictionary";

function WordleContextProvider({ children }) {
  var randomWord=  dictionary[Math.ceil(Math.random()*dictionary.length)];

  const [solution, setSolution] = useState(randomWord);
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('');

  const selectRandomWord = () => {
    randomWord = dictionary[Math.ceil(Math.random()*dictionary.length)];
    setSolution(randomWord);
  }

  const toggleGameStatus = () => {
    setGameOver((prevGameStatus) => !prevGameStatus);
  };

  const changeGameStatus = (status) => {
    setGameStatus(status);
  };

  const initialValue = {
    solution,
    gameOver,
    gameStatus,
    toggleGameStatus,
    changeGameStatus,
    selectRandomWord,
  };

  return (
    <WordleContext.Provider value={initialValue}>
      {children}
    </WordleContext.Provider>
  );
}

export default WordleContextProvider;
