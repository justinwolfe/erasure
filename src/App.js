import React, { useState, useEffect, useReducer } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";
import {reducer, initialState} from "./reducer.js"
import { useImmerReducer } from "use-immer";

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
  
  const saveToLocalStorage = (key, dataObject) => {
    window.localStorage.setItem(key, JSON.stringify(dataObject))
  }

  const getLocalStorage = (key) => {
    const stored = localStorage.getItem(key);
    try {
      return JSON.parse(stored)
    } catch(err){
      return undefined
    }
  }

  const getWord = id => {
    if (!id) {
      return undefined;
    }
    const [paragraphIndex, wordIndex] = id.split("-");
    const word = content.paragraphs[paragraphIndex].words[wordIndex];
    return word;
  };

  const editWord = id => {
    const word = getWord(id);
    alert(word.characters.join(""));
  };

  const toggleMark = (id, value) => {
    const word = getWord(id);

    if (!word) {
      return undefined;
    }

    if (value === false || value === true) {
      word.isMarked = value;
    } else {
      word.isMarked = !word.isMarked;
    }

    const [paragraphIndex, wordIndex] = id.split("-");

    const updatedContent = { ...content };

    updatedContent.paragraphs[paragraphIndex].words[wordIndex] = word;

    setContent(updatedContent);
    saveToLocalStorage('content', updatedContent);
    return word.isMarked;
  };
  
  const reset = () => {
    setContent(undefined)
    window.localStorage.clear();
  }
  
  useEffect(() => {
    const saved = getLocalStorage('content');
    setContent(saved);
  }, [])

  return (
    <div className="App">
      {!content && (
        <Splash setContent={setContent} setCurrentError={setCurrentError} dispatch={logDispatch} />
      )}
      {content && (
        <Editor
          content={content}
          getWord={getWord}
          toggleMark={toggleMark}
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
