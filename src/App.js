import "./App.css";

import React, { useEffect, useReducer, useState } from "react";
import { getLocalStorage, setLocalStorage } from "./utils";
import { initialState, reducer } from "./reducer.js";

import Editor from "./components/Editor.js";
import Splash from "./components/Splash.js";
import { useImmerReducer } from "use-immer";

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const getWord = (id, page) => {
    const [paragraphIndex, wordIndex] = id.split("-");
    const word = page[paragraphIndex].words[wordIndex];
    return word;
  };

  const editWord = (key, characters) =>
    dispatch({ type: "editWord", data: { key, characters } });

  const toggleWord = (key, value) =>
    dispatch({ type: "toggleWord", data: { key, value } });

  const toggleParagraph = (key) =>
    dispatch({ type: "toggleParagraph", data: { key } });

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

  return (
    <div className="App">
      {!state.page && <Splash dispatch={dispatch} />}
      {state.page && (
        <Editor
          page={state.page}
          getWord={getWord}
          toggleWord={toggleWord}
          toggleParagraph={toggleParagraph}
          editWord={editWord}
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
