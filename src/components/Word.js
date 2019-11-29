import React, { useState, useEffect } from "react";

const styles = {
  visible: {
    display: "inline-block"
  },
  invisible: {
    display: "hidden"
  }
};

const Word = ({ characters, id, isVisible, toggleElement }) => {
  const word = characters.map(character => character.character).join("");
  return (
    <React.Fragment>
      <span
        style={isVisible ? styles.visible : styles.invisible}
        onClick={e => {
          toggleElement(id);
        }}
      >
        {word}{isVisible}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
