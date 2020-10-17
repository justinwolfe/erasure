import React, { useState, useEffect } from "react";
import styled from 'styled-components';

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
