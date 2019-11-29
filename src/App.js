import React, { useState } from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js";

import "./App.css";

const App = () => {
  const [content, setContent] = useState("");
  const [currentError, setCurrentError] = useState("");
  return (
    <div className="App">
      {(!content && (
        <Splash setContent={setContent} setCurrentError={setCurrentError} />
      )) ||
        (content && <Editor content={content} />) || <div>default</div>}
    </div>
  );
};

export default App;
