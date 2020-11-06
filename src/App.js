import React, { useState, useEffect, useReducer } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";
import {reducer, initialState} from "./reducer.js"
import { useImmerReducer } from "use-immer";
import {getLocalStorage, setLocalStorage} from './utils'

import "./App.css";

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const getWord = (id) => {
    const [paragraphIndex, wordIndex] = id.split("-");
    const word = state.page[paragraphIndex].words[wordIndex];
    return word;
  };

  /*const editWord = id => {
    const word = getWord(id);
    alert(word.characters.join(""));
  };*/
  
  const toggleWord = (key, value) => {
    let marker = value === false || value === true ? value : undefined;
    dispatch({ type: "toggleWord", data: { key, marker } });
  }
  
  const reset = () => {
    window.localStorage.clear();
    dispatch({type:'reset'});
  }
  
  useEffect(() => {
    if(typeof state.meta !== "undefined"){
      setLocalStorage('state', state)
    }
  }, [state])
  
  useEffect(() => {
    const saved = getLocalStorage('state');
    if(saved){
      dispatch({type:'loadFromStorage', data: saved})
    }
  }, [])
  
  return (
    <div className="App">
      {!state.page && (
        <Splash dispatch={dispatch} />
      )}
      {state.page && (
        <Editor
          page={state.page}
          getWord={getWord}
          toggleWord={toggleWord}
          reset={reset}
          dispatch={dispatch}
          textStyle={state.style.text}
          editorStyle={state.style.editor}
          contentStyle={state.style.content}
        />
      )}
    </div>
  );
};

export default App;
