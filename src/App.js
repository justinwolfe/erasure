import React, { useState } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";

import "./App.css";

const App = () => {
  const [content, setContent] = useState(undefined);
  const [currentError, setCurrentError] = useState("");

  const toggleElement = (id, value) => {
    const [paragraphIndex, wordIndex, characterIndex] = id.split("-");
    const newContent = { ...content };
    const word = newContent.paragraphs[paragraphIndex].words[wordIndex];
    if (word) {
      if (value === false || value === true) {
        word.isMarked = value;
      } else {
        word.isMarked = !word.isMarked;
      }
    }
    setContent(newContent);
  };

  return (
    <div className="App">
      <Splash setContent={setContent} setCurrentError={setCurrentError} />
      {content && <Editor content={content} toggleElement={toggleElement} />}
    </div>
  );
};

export default App;
