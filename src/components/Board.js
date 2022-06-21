import React, { useContext, useEffect, useState } from "react";
import Words from "./Words";
import classes from "./Board.module.css";
import { WordleContext } from "../store/wordle-context";

function Board() {
  const {
    solution,
    gameOver,
    toggleGameStatus: setGameOver,
    changeGameStatus,
  } = useContext(WordleContext);

  const [words, setWords] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  useEffect(() => {
    const handleType = (event) => {
      if (gameOver === true) return;
      if (
        event.key.length > 1 &&
        !(event.key === "Enter" || event.key === "Backspace")
      )
        return;
      if (/^[0-9!@#$%&*()-_=+{};'"`.,|<>?]$/.test(event.key)) return;
      if (event.key === "Enter") {
        if (currentGuess.length !== 5) return;
        const newGuesses = [...words];
        newGuesses[words.findIndex((val) => val === null)] = currentGuess;
        setWords(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          changeGameStatus("WIN");
          setWords((prevWords) => prevWords.fill(null));
          setGameOver();
          setCurrentGuess("");
          return;
        }
        if (words[4] !== null && !isCorrect) {
          changeGameStatus("LOSS");
          setWords((prevWords) => prevWords.fill(null));
          setCurrentGuess("");
          setGameOver();
          return;
        }
      }
      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      if (currentGuess.length >= 5) return;

      setCurrentGuess((prevGuess) => prevGuess + event.key);
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, gameOver, solution, words, setGameOver, changeGameStatus]);

  return (
    <div className={classes.board}>
      {words.map((word, i) => {
        const isCurrentGuess = i === words.findIndex((val) => val === null);
        return (
          <Words
            key={i}
            thisWord={isCurrentGuess ? currentGuess : word ?? ""}
            isFinal={!isCurrentGuess && word != null}
          />
        );
      })}
    </div>
  );
}

export default Board;
