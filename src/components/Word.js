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
        }}
        onMouseDown={e => {
          
        }}
        onMouseEnter={e => {
          console.log(e.buttons)
          console.log(id)
          if(e.buttons){
            toggleElement(id)
          }
        }}
      >
        {word}
        {isVisible}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
