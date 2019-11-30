import React, { useState, useEffect } from "react";

const styles = {
  visible: {
    color: "black"
  },
  invisible: {
    color: "white"
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
        onTouchStart={e => {
          toggleElement(id);
          console.log(e);
        }}
        onTouchMove={e => {
          console.log("touchmove");
          console.log(e);
          console.log(id);
        }}
      >
        {word}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
