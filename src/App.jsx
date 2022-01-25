import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./App.scss";
import { ReactComponent as NewGameSVG } from "../src/image/NewGame.svg";
import { ReactComponent as SettingsSVG } from "../src/image/Settings.svg";
import ModalWin from "./components/ModalWin/ModalWin";

const App = () => {
  const variables = ["x", "o"];
  const arrValues = ["", "", "", "", "", "", "", "", ""];

  const [values, setValues] = useState(arrValues); //массив значений
  const [current, setCurrent] = useState(variables[0]); // x или о
  const [counter, setCounter] = useState(0);
  const [countX, setCountX] = useState(0);
  const [countO, setCountO] = useState(0);
  const [winer, setWiner] = useState(false);
  const [modalWinState, setModalWinState] = useState(false);
  const [titleModal, setTitleModal] = useState(null);

  const onClickDiv = (index) => {
    if (!values[index]) {
      setCounter(counter + 1);
      const copyArr = [...values];
      copyArr[index] = current;
      setValues(copyArr);
      if (current === "x") {
        setCurrent(variables[1]);
      } else {
        setCurrent(variables[0]);
      }
    }
  };

  const newGame = () => {
    setValues(arrValues);
    setCurrent(variables[0]);
    setCounter(0);
    setCountO(0);
    setCountX(0);
    setWiner(false);
  };

  const victoryConditions = () => {
    if (values[0] === values[1] && values[1] === values[2] && values[0]) {
      winerGame(values[0]);
    }
    if (values[3] === values[4] && values[4] === values[5] && values[3]) {
      winerGame(values[3]);
    }
    if (values[6] === values[7] && values[7] === values[8] && values[6]) {
      winerGame(values[6]);
    }
    if (values[0] === values[4] && values[4] === values[8] && values[0]) {
      winerGame(values[0]);
    }
    if (values[1] === values[4] && values[4] === values[7] && values[1]) {
      winerGame(values[1]);
    }
    if (values[2] === values[4] && values[4] === values[6] && values[2]) {
      winerGame(values[2]);
    }
    if (values[0] === values[3] && values[3] === values[6] && values[0]) {
      winerGame(values[0]);
    }
    if (values[2] === values[5] && values[5] === values[8] && values[2]) {
      winerGame(values[2]);
    }
  };

  useEffect(() => {
    victoryConditions();
  }, [values]);

  const winerGame = (win) => {
    setWiner(true);
    setTitleModal(`Выграл: ${win}`);
    setModalWinState(true);
    if (win === "x") {
      setCountX(countX + 1);
    } else {
      setCountO(countO + 1);
    }
  };

  useEffect(() => {
    if (counter > 8) {
      draw();
    }
  }, [counter]);

  const draw = () => {
    if (!winer || counter>8) {
      setTitleModal("Ничья");
      setModalWinState(true);
    }
  };

  const cleanValues = () => {
    setValues(arrValues);
    setCurrent(variables[0]);
    setCounter(0);
  };

  const openSettings = () =>{
    
  }

  return (
    <>
      <div className={!modalWinState ? "app" : "blurDisplay"}>
        <div className="head">
          <div className="btnNewGame" onClick={() => newGame()}>
            <NewGameSVG />
            <p>Начать заново</p>
          </div>
          <div className="settings">
            <SettingsSVG />
            <p onClick={()=>openSettings()}>Настройки</p>
          </div>
        </div>
        <div className="count">
            <p className="countX">X: {countX}</p>
            <p className="countO">O: {countO}</p>
        </div>
        <div className="gameBar">
          <div className="currentMove">Xодит: {current} </div>
          <div className="numberMoves">Количество ходов: {counter}</div>
        </div>
        <div className="containerBox">
          {values.map((item, index) => (
            <div key={index} className="box" onClick={() => onClickDiv(index)}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      {modalWinState && (
        <ModalWin
          setModalWinState={setModalWinState}
          title={titleModal}
          cleanValues={cleanValues}
        />
      )}
    </>
  );
};

export default App;
