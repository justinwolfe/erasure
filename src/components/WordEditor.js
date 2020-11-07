import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import CharacterEditor from "./CharacterEditor";

const WordEditor = ({ word, close, editWord, textStyle }) => {
  const [characters, setCharacters] = useState(word.characters);

  const toggleMark = characterId => {
    const newCharacters = [...characters];
    const characterIndex = newCharacters.findIndex(
      character => character.id === characterId
    );
    console.log("characterIndex", characterIndex);
    console.log(newCharacters[characterIndex]);
    newCharacters[characterIndex].isMarked = true;
    //newCharacters[characterIndex].isMarked = false;
    //setCharacters(newCharacters);
  };

  return (
    <Modal close={close}>
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
