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

const initialTextStyle = {
  global: {
    fontSize: "20px"
  },
  marked: {
    opacity: "5%"
  },
  unmarked: {
    opacity: "100%"
  }
};

const contentStyle = { backgroundColor: "white", padding: "10%" };

const Editor = ({ content, toggleMark, getWord }) => {
  const { paragraphs, url, created } = content;
  const [markType, setMarkType] = useState(true);
  const [currentGesture, setCurrentGesture] = useState(undefined);
  const [gestureStarted, setGestureStarted] = useState(false);
  const [screenshotLink, setScreenshotLink] = useState(undefined);
  const [textStyle, setTextStyle] = useState(initialTextStyle);
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
      console.log(word);
    }
    toggleMark(key, currentGesture);
  };

  const handleTextStyleChange = (parentKey, propertyKey, value) => {
    const newStyle = { ...textStyle };
    newStyle[parentKey][propertyKey] = value;
    setTextStyle(newStyle);
  };

  const handleMarkTypeChange = val => {
    keyCache.current.clear();
    setMarkType(val);
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
    mark(e.target);
  };

  const handleStop = e => {
    keyCache.current.clear();
    setGestureStarted(false);
    setCurrentGesture(undefined);
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
      onDoubleClick={e => alert("dblClick")}
    >
      <div>
        'currentGesture'{JSON.stringify(currentGesture)}
        'gestureStarted'{JSON.stringify(gestureStarted)}
      </div>
      <Controls
        markType={markType}
        handleMarkTypeChange={handleMarkTypeChange}
        handleScreenshot={handleScreenshot}
        handleTextStyleChange={handleTextStyleChange}
        textStyle={textStyle}
      />
      <div id="content" style={contentStyle}>
        {paragraphs &&
          paragraphs.map(paragraph => (
            <p className="paragraph" key={paragraph.id} name={paragraph.id}>
              {paragraph.words.map(word => (
                <Word
                  characters={word.characters}
                  key={word.id}
                  id={word.id}
                  name={word.id}
                  isMarked={word.isMarked}
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
