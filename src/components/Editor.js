import React, { useState, useEffect, useRef } from "react";
import Word from "./Word";
import Controls from "./Controls";
import debounce from "just-debounce";
import { handleScreenshot } from "../utils";

const editorStyle = {
  textAlign: "left",
  wordWrap: "break-word",
  cursor: "pointer",
  userSelect: "none"
};

const contentStyle = { backgroundColor: "white", padding: "12%" };

const Editor = ({
  page,
  toggleWord,
  getWord,
  editWord,
  reset,
  textStyle,
  setTextStyle,
  dispatch
}) => {
  const [currentGesture, setCurrentGesture] = useState(undefined);
  const [gestureStarted, setGestureStarted] = useState(false);
  const keyCache = useRef(new Set());

  const mark = node => {
    const key = node.getAttribute("name");
    if (!key || keyCache.current.has(key)) return;
    keyCache.current.add(key);
    if (currentGesture === undefined) {
      const word = getWord(key);
      if (word) {
        setCurrentGesture(!word.isMarked);
      }
    }
    toggleWord(key, currentGesture);
  };

  const handleTextStyleChange = (parentKey, propertyKey, value) => {
    const newStyle = { ...textStyle };
    newStyle[parentKey][propertyKey] = value;
    setTextStyle(newStyle);
  };

  const handleMove = e => {
    const { clientX, clientY } =
      e.nativeEvent.type === "mousemove" ? e : e.changedTouches[0];
    if (
      (e.nativeEvent.type === "mousemove" && gestureStarted) ||
      e.nativeEvent.type === "touchmove"
    ) {
      const movedIntoElement = document.elementFromPoint(clientX, clientY);
      if (movedIntoElement) {
        mark(movedIntoElement);
      }
    }
  };

  const handleStart = e => {
    setGestureStarted(true);
  };

  const handleStop = e => {
    keyCache.current.clear();
    setGestureStarted(false);
    setCurrentGesture(undefined);
  };

  const handleDoubleClick = e => {
    const key = e.target.getAttribute("name");
    if (key) {
      editWord(key);
    }
  };

  const debouncedMove = e => debounce(handleMove(e), 200);

  return (
    <div
      style={editorStyle}
      onTouchStart={handleStart}
      onTouchMove={debouncedMove}
      onTouchEnd={handleStop}
      onMouseDown={handleStart}
      onMouseMove={debouncedMove}
      onMouseUp={handleStop}
      onDoubleClick={handleDoubleClick}
    >
      <Controls
        handleTextStyleChange={handleTextStyleChange}
        textStyle={textStyle}
        reset={reset}
      />
      <div id="content" style={contentStyle}>
        {page &&
          page.map(paragraph => (
            <p className="paragraph" key={paragraph.id} name={paragraph.id}>
              {paragraph.words.map(word => (
                <Word
                  characters={word.characters}
                  key={word.id}
                  id={word.id}
                  name={word.id}
                  isMarked={word.isMarked}
                  customCharacters={word.customCharacters}
                  textStyle={textStyle}
                />
              ))}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Editor;
