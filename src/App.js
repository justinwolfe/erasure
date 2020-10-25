import React, { useState, useEffect, useReducer } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";
import {reducer, initialState} from "./reducer.js"
import { useImmerReducer } from "use-immer";
import {getLocalStorage, setLocalStorage} from './utils'

import "./App.css";

const initialTextStyle = {
  global: {
    fontSize: 20,
    fontFamily: 'Helvetica, Arial',
    lineHeight:'1.4'
  },
  marked: {
    opacity: "5%"
  },
  unmarked: {
    opacity: "100%"
  }
};

const App = () => {
  const [currentError, setCurrentError] = useState("");
  const [textStyle, setTextStyle] = useState(initialTextStyle);
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  
  /*const logDispatch = (action) => {
    console.log(action);
    dispatch(action);
  }*/

  const getWord = id => {
    if (!id) {
      return undefined;
    }
    const [paragraphIndex, wordIndex] = id.split("-");
    const word = state.page[paragraphIndex].words[wordIndex];
    return word;
  };

  const editWord = id => {
    const word = getWord(id);
    alert(word.characters.join(""));
  };
  
  const toggleWord = (key, value) => {
    const word = getWord(key);
    
    if (!word) {
      return undefined;
    }
    
    let marker = value === false || value === true ? value : undefined;
    
    dispatch({ type: "toggleWord", data: { key, marker } });
  }
  
  const reset = () => {
    window.localStorage.clear();
    dispatch('reset');
  }
  
  useEffect(() => {
    //const saved = getLocalStorage('content');
  }, [])
  
  console.log("state", state)

  return (
    <div className="App">
      {!state.page && (
        <Splash setCurrentError={setCurrentError} dispatch={dispatch} />
      )}
      {state.page && (
        <Editor
          page={state.page}
          getWord={getWord}
          toggleWord={toggleWord}
          editWord={editWord}
          reset={reset}
          dispatch={dispatch}
          textStyle={state.style.text}
        />
      )}
    </div>
  );
};

export default App;
