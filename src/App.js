import React, { useState } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";

import "./App.css";

const App = () => {
  const [content, setContent] = useState(undefined);
  const [currentError, setCurrentError] = useState("");

  const toggleMark = (id, value) => {
    if (!id) {
      return;
    }
    const [paragraphIndex, wordIndex, characterIndex] = id.split("-");
    const newContent = { ...content };
    const word = newContent.paragraphs[paragraphIndex].words[wordIndex];
    if (!word) {
      return;
    }
    word.isMarked = !word.isMarked;
    setContent(newContent);
  };

  return (
    <div className="App">
      <Splash setContent={setContent} setCurrentError={setCurrentError} />
      {content && <Editor content={content} toggleMark={toggleMark} />}
    </div>
  );
};

export default App;
