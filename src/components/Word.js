import React, { useState, useEffect } from "react";

const Word = ({ characters, id, isVisible, toggleElement }) => {
  const word = characters.map(character => character.character).join("");
  return (
    <React.Fragment>
      <span className={isVisible} onClick={(e) => {
          toggleElement(id)
        }}>{word}</span>{" "}
    </React.Fragment>
  );
};

export default Word;
