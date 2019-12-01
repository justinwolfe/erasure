import React, { useState, useEffect } from "react";

const styles = {
  visible: {
    color: "black"
  },
  invisible: {
    color: "white"
  }
};

const Word = ({ characters, id, isVisible, toggleElement, name }) => {
  const word = characters.map(character => character.character).join("");
  return (
    <React.Fragment>
      <span
        name={id}
        data-visible={isVisible}
        style={isVisible ? styles.visible : styles.invisible}
        onClick={e => {
          toggleElement(id);
        }}
      >
        {word}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
