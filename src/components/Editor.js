import React, { useState, useEffect, useRef } from "react";
import Word from "./Word";
import Paragraph from "./Paragraph";
import Controls from "./Controls";
import WordEditor from "./WordEditor";
import { handleScreenshot } from "../utils";

const Editor = ({
  page,
  toggleWord,
  getWord,
  editWord,
  reset,
  textStyle,
  editorStyle,
  contentStyle,
  dispatch
}) => {
  const [currentGesture, setCurrentGesture] = useState(undefined);
  const [gestureStarted, setGestureStarted] = useState(false);
  const keyCache = useRef(new Set());
  const [wordEditorOpen, setWordEditorOpen] = useState(false);
  const [editedWord, setEditedWord] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);

  const mark = key => {
    if (wordEditorOpen) return;
    if (!key || keyCache.current.has(key)) return;
    keyCache.current.add(key);
    if (typeof currentGesture === "undefined") {
      const word = getWord(key, page);
      if (word) {
        setCurrentGesture(!word.isMarked);
      }
    }
    toggleWord(key, currentGesture);
  };

  const getWordKey = element => {
    if (element === null) return undefined;
    if (element.getAttribute("name")) {
      return element.getAttribute("name");
    }
    if (element.parentElement && element.parentElement.getAttribute("name")) {
      return element.parentElement.getAttribute("name");
    }
    return undefined;
  };

  const handleMove = e => {
    const { clientX, clientY } =
      e.nativeEvent.type === "mousemove" ? e : e.changedTouches[0];
    if (
      (e.nativeEvent.type === "mousemove" && gestureStarted) ||
      e.nativeEvent.type === "touchmove"
    ) {
      const movedIntoElement = document.elementFromPoint(clientX, clientY);
      const wordKey = getWordKey(movedIntoElement);
      if (wordKey) {
        mark(wordKey);
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
    const wordKey = getWordKey(e.target);
    if (!wordKey) return;
    const word = getWord(wordKey, page);
    if (!word) return;
    setEditedWord(word);
    setWordEditorOpen(true);
  };

  const handleScroll = e => {
    console.log("scrolling");
    if (!isScrolling) {
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    }
  };

  const close = () => setWordEditorOpen(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={editorStyle}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleStop}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleStop}
      onDoubleClick={handleDoubleClick}
    >
      {wordEditorOpen && (
        <WordEditor
          word={editedWord}
          editWord={editWord}
          close={close}
          textStyle={textStyle}
        />
      )}
      <Controls textStyle={textStyle} dispatch={dispatch} reset={reset} />
      <div id="content" style={contentStyle}>
        {page &&
          page.map(paragraph => (
            <Paragraph
              key={paragraph.id}
              name={paragraph.id}
              handleVisible={isScrolling}
            >
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
            </Paragraph>
          ))}
      </div>
    </div>
  );
};

export default Editor;
