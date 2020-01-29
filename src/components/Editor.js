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
    fontSize: 12
  },
  marked: {
    opacity: "10%"
  },
  unmarked: {
    opacity: "100%"
  }
};

const contentStyle = { backgroundColor: "white", padding: "10%" };

const Editor = ({ content, toggleElement }) => {
  const { paragraphs, url, created } = content;
  const [markType, setMarkType] = useState(true);
  const [screenshotLink, setScreenshotLink] = useState(undefined);
  const [mouseDown, setMouseDown] = useState(false);
  const [textStyle, setTextStyle] = useState(initialTextStyle);
  const keyCache = useRef(new Set());

  const handleTextStyleChange = (parentKey, propertyKey, value) => {
    const newStyle = {...textStyle}
    newStyle[parentKey][propertyKey] = value
    setTextStyle(newStyle)
  };

  const handleMarkTypeChange = val => {
    keyCache.current.clear();
    setMarkType(val);
  };

  const cacheAndToggle = node => {
    const key = node.getAttribute("name");
    if (!key || keyCache.current.has(key)) return;
    keyCache.current.add(key);
    toggleElement(key, markType);
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
        cacheAndToggle(movedIntoElement);
      }
    }
  };

  const handleStart = e => {
    if (e.nativeEvent.type === "mousedown") setMouseDown(true);
    cacheAndToggle(e.target);
  };

  const handleStop = e => setMouseDown(false);

  const debouncedMove = e => debounce(handleMove(e), 200);

  return (
    <div
      style={editorStyle}
      onTouchStart={handleStart}
      onTouchMove={debouncedMove}
      onMouseDown={handleStart}
      onMouseMove={debouncedMove}
      onMouseUp={handleStop}
      onDoubleClick={e => alert("dblClick")}
    >
      <Controls
        markType={markType}
        handleMarkTypeChange={handleMarkTypeChange}
        handleScreenshot={handleScreenshot}
        screenshotLink={screenshotLink}
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
                  toggleElement={toggleElement}
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
