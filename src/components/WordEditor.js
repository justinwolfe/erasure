import React, { useState, useEffect, useRef } from "react";
import Modal from './Modal'
import CharacterEditor from "./CharacterEditor"

const WordEditor = ({word, close, editWord}) => {
 return <Modal close={close}>
   <div>
     {word.characters.map(({character, id}) => <CharacterEditor key={id} character={character} />)}
   </div>
 </Modal>
}

export default WordEditor