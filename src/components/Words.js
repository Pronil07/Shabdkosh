import React, { useContext } from "react";
import { WordleContext } from "../store/wordle-context";
import classes from "./Words.module.css";

function Words({ thisWord, isFinal }) {
  const {solution} = useContext(WordleContext);
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const letter = thisWord[i];
    let className = `${classes.tiles}`;

    if (isFinal) {
      if (letter === solution[i]) {
        className = `${classes.tiles} ${classes.correct}`;
      } else if (solution.includes(letter)) {
        className = `${classes.tiles} ${classes.partiallyCorrect}`;
      } else {
        className = `${classes.tiles} ${classes.incorrect}`;
      }
    }
    tiles.push(
      <div key={i} className={className}>
        {letter}
      </div>
    );
  }

  return <div className={classes.words}>{tiles}</div>;
}

export default Words;
