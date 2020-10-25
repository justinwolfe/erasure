import React, { useState } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";

import "./App.css";

const App = () => {
  const [content, setContent] = useState(undefined);
  const [meta, setMeta] = useState(undefined);
  const [currentError, setCurrentError] = useState("");
  
  const saveToLocalStorage = (key, dataObject) => {
    window.localStorage.setItem(key, JSON.stringify(dataObject))
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

  return (
    <div className="App">
      {!content && (
        <Splash setContent={setContent} setCurrentError={setCurrentError} />
      )}
      {content && (
        <Editor
          content={content}
          getWord={getWord}
          toggleMark={toggleMark}
          editWord={editWord}
          reset={reset}
        />
      )}
    </div>
  );
};

export default App;
