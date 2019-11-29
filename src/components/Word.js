import React, { useState, useEffect } from "react";

const Word = ({ characters, isVisible, toggle }) => {
  const word = characters.map(character => character.character).join("");
  return (
    <React.Fragment>
      <span>{word}</span>{" "}
    </React.Fragment>
  );
};

export default Word;
