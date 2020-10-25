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
  const [content, setContent] = useState(undefined);
  const [meta, setMeta] = useState(undefined);
  const [currentError, setCurrentError] = useState("");
  const [textStyle, setTextStyle] = useState(initialTextStyle);
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  
  const logDispatch = (action) => {
    console.log(action);
    dispatch(action);
  }

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
    setContent(undefined)
    window.localStorage.clear();
  }
  
  useEffect(() => {
    const saved = getLocalStorage('content');
    setContent(saved);
  }, [])
  
  console.log("state", state)

  return (
    <div className="App">
      {!content && (
        <Splash setContent={setContent} setCurrentError={setCurrentError} dispatch={logDispatch} />
      )}
      {content && (
        <Editor
          page={state.page}
          getWord={getWord}
          toggleWord={toggleWord}
          editWord={editWord}
          reset={reset}
          dispatch={logDispatch}
          textStyle={textStyle}
        />
      )}
    </div>
  );
};

export default App;
