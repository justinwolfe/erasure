import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import CharacterEditor from "./CharacterEditor";

const WordEditor = ({ word, close, editWord }) => {
  const [characters, setCharacters] = useState(word.characters);
  console.log(word.characters);
  
  const toggleMark = (id) => {
    
  }
  
  return (
    <Modal close={close}>
      <div>
        {word.characters.map(({ character, id, isMarked }) => (
          <CharacterEditor key={id} character={character} isMarked={isMarked} const toggleMark={toggleMark} />
        ))}
      </div>
    </Modal>
  );
};

export default WordEditor;
