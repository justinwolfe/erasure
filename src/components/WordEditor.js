import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import CharacterEditor from "./CharacterEditor";

const WordEditor = ({ word, close, editWord, textStyle }) => {
  const [currentGesture, setCurrentGesture] = useState(undefined);
  const [gestureStarted, setGestureStarted] = useState(false);
  const [characters, setCharacters] = useState(word.characters);
  
  const handleStart = e => {
    setGestureStarted(true);
  };

  const handleStop = e => {
    setGestureStarted(false);
    setCurrentGesture(undefined);
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

  const toggleMark = characterId => {
    const newCharacters = [...characters];
    const characterIndex = newCharacters.findIndex(
      character => character.id === characterId
    );
    newCharacters[characterIndex] = {
      ...newCharacters[characterIndex],
      isMarked: !newCharacters[characterIndex].isMarked
    };
    setCharacters(newCharacters);
  };

  return (
    <Modal
      close={() => {
        editWord(word.id, characters);
        close();
      }}
    >
      <div>
        {characters.map(({ character, id, isMarked }) => (
          <CharacterEditor
            key={id}
            id={id}
            character={character}
            isMarked={isMarked}
            toggleMark={toggleMark}
            textStyle={textStyle}
          />
        ))}
      </div>
    </Modal>
  );
};

export default WordEditor;
