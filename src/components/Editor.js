import React, { useState, useEffect, useRef } from "react";
import Word from "./Word";
import Controls from "./Controls";
import debounce from "just-debounce";
import {handleScreenshot} from '../utils'

const style = {
  textAlign: "left",
  wordWrap: "break-word",
  cursor: "pointer",
  userSelect: "none"
};

const Editor = ({ content, toggleElement }) => {
  const { paragraphs, url, created } = content;
  const [currentTouchType, setCurrentTouchType] = useState(false);
  const [screenshotLink, setScreenshotLink] = useState(undefined);
  const [mouseState, setMouseState] = useState(0)
  const keyCache = useRef(new Set());

  const handleTouchTypeChange = val => {
    keyCache.current.clear();
    setCurrentTouchType(val);
  };

  const handleTouchStart = e => {
    const key = e.target.getAttribute("name");
    if (!key) return;
    if (keyCache.current.has(key)) return;
    keyCache.current.add(key);
    toggleElement(key, currentTouchType);
  };

  const handleTouchMove = e => {
    const { clientX, clientY } = e.changedTouches[0];
    const movedIntoElement = document.elementFromPoint(clientX, clientY);
    if (movedIntoElement) {
      const key = movedIntoElement.getAttribute("name");
      if (key && !keyCache.current.has(key)) {
        toggleElement(key, currentTouchType);
        keyCache.current.add(key);
      }
    }
  };
  
  const handleMouseMove = e => {
    const { clientX, clientY } = e
    const movedIntoElement = document.elementFromPoint(clientX, clientY);
    if (movedIntoElement) {
      const key = movedIntoElement.getAttribute("name");
      if (key && !keyCache.current.has(key)) {
        toggleElement(key, currentTouchType);
        keyCache.current.add(key);
      }
    }
  }
  
  const handleMove = e => {
    if(e.nativeEvent.type === "mousemove" && mouseState){
      handleMouseMove(e)
    }
    if(e.nativeEvent.type === "touchmove"){
      handleTouchMove(e)
    }
  }
  
  const handleStart = e => {
    if(e.nativeEvent.type === "mousedown"){
      handleMouseMove(e)
      setMouseState(1)
    }
    if(e.nativeEvent.type === "touchstart"){
      handleTouchMove(e)
    }
  }
  
  const handleStop = e => {
    setMouseState(0);
  }

  const debouncedMove = e => debounce(handleMove(e), 300);

  return (
    <div
      style={style}
      onTouchStart={handleStart}
      onTouchMove={debouncedMove}
      onMouseDown={handleStart}
      onMouseMove={debouncedMove}
      onMouseUp={handleStop}
    >
      <Controls
        currentTouchType={currentTouchType}
        handleTouchTypeChange={handleTouchTypeChange}
        handleScreenshot={handleScreenshot}
        screenshotLink={screenshotLink}
      />
      <div id="content">
        {paragraphs &&
          paragraphs.map(paragraph => (
            <p className="paragraph" key={paragraph.id} name={paragraph.id}>
              {paragraph.words.map(word => (
                <Word
                  characters={word.characters}
                  key={word.id}
                  id={word.id}
                  name={word.id}
                  isVisible={word.isVisible}
                  toggleElement={toggleElement}
                />
              ))}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Editor;
