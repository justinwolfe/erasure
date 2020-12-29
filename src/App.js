import "./App.css";

import React, { useEffect, useReducer, useState } from "react";
import { getLocalStorage, setLocalStorage } from "./utils";
import { initialState, reducer } from "./reducer.js";

import Editor from "./components/Editor.js";
import Splash from "./components/Splash.js";
import { useImmerReducer } from "use-immer";

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const reset = () => {
    window.localStorage.clear();
    dispatch({ type: "reset" });
  };

  useEffect(() => {
    if (typeof state.meta !== "undefined") {
      setLocalStorage("state", state);
    }
  }, [state]);

  useEffect(() => {
    const saved = getLocalStorage("state");
    if (saved) {
      dispatch({ type: "loadFromStorage", data: saved });
    }
  }, []);
  
  const updateSavedState = (state) => {
    
  }

  return (
    <div className="App">
      {!state.page && <Splash dispatch={dispatch} />}
      {state.page && (
        <Editor
          page={state.page}
          toggleParagraph={toggleParagraph}
          editWord={editWord}
          reset={reset}
          dispatch={dispatch}
          textStyle={state.style.text}
          editorStyle={state.style.editor}
          contentStyle={state.style.content}
          updateSavedState={updateSavedState}
        />
      )}
    </div>
  );
};

export default App;
