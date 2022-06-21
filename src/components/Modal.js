import React, { useContext, useEffect, useState } from "react";
import classes from "./Modal.module.css";
import ReactDom from "react-dom";
import { WordleContext } from "../store/wordle-context";

function Modal() {
  const { gameStatus, toggleGameStatus, changeGameStatus, solution , selectRandomWord} =
    useContext(WordleContext);
  const portalElement = document.getElementById("overlay");
  const [meaning, setMeaning] = useState("");

  const closeModal = () => {
    toggleGameStatus();
    changeGameStatus("");
    selectRandomWord();
  };

  useEffect(() => {
    const fetchMeaning = async () => {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${solution}`
      );
      const data = await response.json();
      setMeaning(data[0].meanings[0]?.definitions[0]?.definition);
    };
    fetchMeaning();
  }, [solution]);

  const renderElement = (
    <div className={classes.entireWindow}>
      <div className={classes.modal}>
        {gameStatus === "WIN" ? (
          <>
            <h3>Congratulations!!</h3>
            <p>You have succesfully guessed the correct Word!!</p>
            <p>
              The word is <strong>{solution}</strong> which means <br></br>
              <i>{meaning}</i>
            </p>
          </>
        ) : (
          <>
            <h3>YOU LOST!!</h3>
            <p>You have lost the game! Try Again!</p>
            <p>
              The word is <strong>{solution}</strong> which means <br></br>
              <i>{meaning}</i>
            </p>
          </>
        )}
        <button className={classes.button} onClick={closeModal}>
          Play Again
        </button>
      </div>
      <div className={classes.backdrop} onClick={closeModal}></div>
    </div>
  );
  return <>{ReactDom.createPortal(renderElement, portalElement)}</>;
}

export default Modal;
