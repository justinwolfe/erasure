import React, { useState, useEffect, useRef } from "react";
import Word from "./Word";
import Controls from "./Controls";
import debounce from "just-debounce";
import { handleScreenshot } from "../utils";

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
  const [mouseDown, setMouseDown] = useState(false);
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

  const handleMove = e => {
    const { clientX, clientY } =
      e.nativeEvent.type === "mousemove" ? e : e.changedTouches[0];
    if (
      (e.nativeEvent.type === "mousemove" && mouseDown) ||
      e.nativeEvent.type === "touchmove"
    ) {
      const movedIntoElement = document.elementFromPoint(clientX, clientY);
      if (movedIntoElement) {
        const key = movedIntoElement.getAttribute("name");
        if (key && !keyCache.current.has(key)) {
          toggleElement(key, currentTouchType);
          keyCache.current.add(key);
        }
      }
    }
  };

  const handleStart = e => {
    if (e.nativeEvent.type === "mousedown") {
      setMouseDown(true);
    }
  };

  const handleStop = e => {
    setMouseDown(false);
  };

  const debouncedMove = e => debounce(handleMove(e), 200);

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
