import React, { useState, useEffect } from "react";

const Word = ({ characters, id, isMarked, name, textStyle }) => {
  const word = characters.map(character => character.character).join("");
  return (
    <React.Fragment>
      <span
        name={id}
        style={{
          ...textStyle.global,
          ...(isMarked ? textStyle.marked : textStyle.unmarked)
        }}
      >
        {word}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
