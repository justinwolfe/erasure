import React, { useState, useEffect, useRef } from "react";
import Word from "./Word";
import Paragraph from "./Paragraph";
import Controls from "./Controls";
import WordEditor from "./WordEditor";
import { handleScreenshot } from "../utils";

const useGestureOnPage = (collection, callback) => {
  const [statefulCollection, setStatefulCollection] = useState(collection);
  const [currentGesture, setCurrentGesture] = useState(undefined);
  const [gestureStarted, setGestureStarted] = useState(false);
  const keyCache = useRef(new Set());

  const toggleWord = key => {
    const newCollection = JSON.parse(JSON.stringify(statefulCollection))
    const [paragraphIndex, wordIndex] = key.split("-");
    if (newCollection[paragraphIndex].words[wordIndex]) {
      if (typeof currentGesture === "undefined") {
        newCollection[paragraphIndex].words[
          wordIndex
        ].isMarked = !newCollection[paragraphIndex].words[wordIndex]
          .isMarked;
      } else {
        newCollection[paragraphIndex].words[
          wordIndex
        ].isMarked = currentGesture;
      }
      setStatefulCollection(newCollection);
    }
  };

  const getWord = (id, page) => {
    const [paragraphIndex, wordIndex] = id.split("-");
    const word = page[paragraphIndex].words[wordIndex];
    return word;
  };

  const mark = key => {
    if (!key || keyCache.current.has(key)) return;
    const word = getWord(key, collection);
    if (typeof currentGesture === "undefined") {
      if (word) {
        setCurrentGesture(!word.isMarked);
      }
    }
    toggleWord(key, currentGesture)
    //callback(key, currentGesture);
    keyCache.current.add(key);
  };

  const getWordKey = element => {
    if (element === null) return undefined;
    if (element.getAttribute("name")) {
      return element.getAttribute("name");
    }
    if (element.closest("[name]")) {
      return element.closest("[name]").getAttribute("name");
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
    if (getWordKey(e.target)) {
      mark(getWordKey(e.target));
    }
  };

  const handleStop = e => {
    keyCache.current.clear();
    setGestureStarted(false);
    setCurrentGesture(undefined);
  };

  return {
    gestureStart: handleStart,
    gestureStop: handleStop,
    gestureMove: handleMove,
    gesture: currentGesture,
    statefulCollection: statefulCollection
  };
};

const Editor = ({
  page,
  editWord,
  reset,
  textStyle,
  editorStyle,
  contentStyle,
  dispatch,
  toggleParagraph
}) => {
  const [wordEditorOpen, setWordEditorOpen] = useState(false);
  const [editedWord, setEditedWord] = useState({});
  const {
    gestureStart,
    gestureStop,
    gestureMove,
    statefulCollection
  } = useGestureOnPage(page, (key, gesture) => {
    //toggleWord(key, gesture);
  });

  const handleDoubleClick = e => {
    /*const wordKey = getWordKey(e.target);
    if (!wordKey) return;
    const word = getWord(wordKey, page);
    if (!word) return;
    setEditedWord(word);
    setWordEditorOpen(true);*/
  };

  const close = () => setWordEditorOpen(false);

  return (
    <div
      style={editorStyle}
      onTouchStart={gestureStart}
      onTouchMove={gestureMove}
      onTouchEnd={gestureStop}
      onMouseDown={gestureStart}
      onMouseMove={gestureMove}
      onMouseUp={gestureStop}
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
        {statefulCollection &&
          statefulCollection.map(paragraph => (
            <Paragraph
              key={paragraph.id}
              name={paragraph.id}
              id={paragraph.id}
              toggleParagraph={toggleParagraph}
              handleVisible={true}
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
