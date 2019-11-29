import React, { useState } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";

import "./App.css";

const App = () => {
  const [content, setContent] = useState(undefined);
  const [currentError, setCurrentError] = useState("");

  const toggleElement = id => {
    const [paragraphIndex, wordIndex, characterIndex] = id.split("-");
    const newContent = { ...content };
    const word = newContent.paragraphs[paragraphIndex].words[wordIndex];
    word.isVisible = !word.isVisible;
    console.log("before set", newContent.paragraphs[0].words[0])
    setContent(newContent);
  };

  console.log("render", content && content.paragraphs && content.paragraphs[0].words[0])
  return (
    <div style={{ margin: "10%" }} className="App">
      {(!content && (
        <Splash setContent={setContent} setCurrentError={setCurrentError} />
      )) ||
        (content && (
          <Editor content={content} toggleElement={toggleElement} />
        )) || <div>default</div>}
    </div>
  );
};

export default App;
