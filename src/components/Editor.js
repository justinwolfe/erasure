import React, { useState, useEffect, useRef } from "react";
import Word from "./Word";
import Paragraph from "./Paragraph";
import Controls from "./Controls";
import WordEditor from "./WordEditor";
import { handleScreenshot } from "../utils";
import { useGestureOnPage } from "./hooks";

const Editor = ({
  page,
  editWord,
  reset,
  textStyle,
  editorStyle,
  contentStyle,
  dispatch,
  updateSavedPage
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

  useEffect(() => {
    updateSavedPage(gesturefulPage);
  }, [gesturefulPage]);

  const handleDoubleClick = e => {
    const wordKey = getWordKey(e.target);
    if (!wordKey) return;
    const word = getWord(wordKey, page);
    if (!word) return;
    setEditedWord(word);
    setWordEditorOpen(true);
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
        {gesturefulPage &&
          gesturefulPage.map((unit, unitIndex) =>
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
              <div key={`break-${unitIndex}`}>
                <br />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Editor;

/*

            <Word
              characters={word.characters}
              key={word.id}
              id={word.id}
              name={word.id}
              isMarked={word.isMarked}
              customCharacters={word.customCharacters}
              textStyle={textStyle}
            />

          /*gesturefulPage.map(paragraph => (
            <Paragraph
              key={paragraph.id}
              name={paragraph.id}
              id={paragraph.id}
              handleVisible={false}
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
            </Paragraph>*/
