import React, { useState } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";

import "./App.css";

const App = () => {
  const [content, setContent] = useState(undefined);
  const [currentError, setCurrentError] = useState("");
  
  const toggleElement = (id) => {
    const [paragraph, word, character] = id.split("-")
    console.log()
  }
  
  return (
    <div style={{margin:'10%'}}className="App">
      {(!content && (
        <Splash setContent={setContent} setCurrentError={setCurrentError} />
      )) ||
        (content && <Editor content={content} />) || <div>default</div>}
    </div>
  );
};

export default App;
