import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import CharacterEditor from "./CharacterEditor";

const WordEditor = ({ word, close, editWord, textStyle }) => {
  const [characters, setCharacters] = useState(word.characters);
  console.log(word.characters);

  const toggleMark = characterId => {
    const newCharacters = [...characters];
    const characterIndex = newCharacters.findIndex(
      character => character.id === characterId
    );
    newCharacters[characterIndex].isMarked = !characters[characterIndex]
      .isMarked;
    setCharacters(newCharacters);
  };

  return (
    <Modal close={close}>
      <div>
        {word.characters.map(({ character, id, isMarked }) => (
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
