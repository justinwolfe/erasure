import React, { useState, useEffect } from "react";

const styles = {
  visible: {
    color: "black"
  },
  invisible: {
    opacity: "10%"
  }
};

const Word = ({ characters, id, isMarked, toggleElement, name }) => {
  const word = characters.map(character => character.character).join("");
  return (
    <React.Fragment>
      <span
        name={id}
        data-marked={isMarked}
        style={isMarked ? styles.invisible : styles.visible}
      >
        {word}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
