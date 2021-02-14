import React, { useState, useEffect, useRef } from "react";
import Word from "./Word";
import Paragraph from "./Paragraph";
import Controls from "./Controls";
import WordEditor from "./WordEditor";
import { handleScreenshot } from "../utils";
import { useGestureOnPage } from "./hooks";
import { throttle } from 'throttle-debounce';

const Editor = ({
  page,
  editWord,
  reset,
  textStyle,
  editorStyle,
  contentStyle,
  dispatch,
  updateSavedPage,
  interactionType
}) => {
  const [wordEditorOpen, setWordEditorOpen] = useState(false);
  const [editedWord, setEditedWord] = useState({});
  const {
    gestureStart,
    gestureStop,
    gestureMove,
    gesturefulPage,
    getWordKey,
    getWord
  } = useGestureOnPage(page);

  /*useEffect(() => {
    updateSavedPage(gesturefulPage);
  }, [gesturefulPage]);*/

  const handleDoubleClick = e => {
    const wordKey = getWordKey(e.target);
    if (!wordKey) return;
    const word = getWord(wordKey, page);
    if (!word) return;
    setEditedWord(word);
    setWordEditorOpen(true);
  };

  const close = () => setWordEditorOpen(false);

  const touchListeners = {
    onTouchStart: gestureStart,
    onTouchMove: throttle(1000, {noTrailing: true},gestureMove),
    onTouchEnd: gestureStop
  };

  const mouseListeners = {
    onMouseDown: gestureStart,
    onMouseMove: throttle(1000, noTrailing: true, gestureMove),
    onMouseUp: gestureStop
  };

  return (
    <div
      style={editorStyle}
      {...(interactionType === "touch" ? touchListeners : mouseListeners)}
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
        {gesturefulPage &&
          gesturefulPage.map(unit =>
            unit.type === "word" ? (
              <Word
                characters={unit.characters}
                key={unit.id}
                id={unit.id}
                name={unit.id}
                isMarked={unit.isMarked}
                customCharacters={unit.customCharacters}
                textStyle={textStyle}
              />
            ) : (
              <div key={unit.id}>
                <br />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Editor;
