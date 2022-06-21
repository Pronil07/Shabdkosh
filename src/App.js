import { useCallback, useContext, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { WordleContext } from "./store/wordle-context";
import Modal from "./components/Modal";

function App() {
  const { gameOver } = useContext(WordleContext);
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : prevTheme === "dark" ? "light" : "light"
    );
  }, []);

  

  return (
    <>
      {gameOver && <Modal />}
      <div data-theme={theme} className="app">
        <header className="header">
          <h1>शब्दकोश</h1>
          <div className="theme-section">
            <p>{theme === "dark" ? "Dark" : "Light"} theme enabled</p>
            <label className="switch">
              <input type="checkbox" onClick={toggleTheme} />
              <span className="slider round"></span>
            </label>
          </div>
        </header>
        <div className="board">
          <p>You have 6 tries to guess the unique word!!</p>
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;
