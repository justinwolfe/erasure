import React, {useState} from "react";
import Splash from "./components/Splash.js";
import Editor from "./components/Editor.js"

import "./App.css";

const RegisteredComponents = {
  splash: <Splash/>,
  editor: <Editor/>,
}

const App = () => {
  const [content, setContent] = useState('')
  const [currentScreen, setCurrentScreen] = useState('Splash')
  
  return (
    <div className="App">
      {
        currentScreen === "Splash" && !content (
          <Splash setContent={setContent} />
        )
        || currentScreen === "Editor" && (
          <Editor/>
        )
        || <div>default</div>
      }
      <Splash />
    </div>
  );
};

export default App;
