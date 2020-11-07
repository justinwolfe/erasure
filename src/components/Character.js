import React from "react";
import styled from "styled-components";

const Character = ({ character, isMarked, textStyle }) => (
  <span
    style={{
      ...(isMarked ? textStyle.marked : textStyle.unmarked)
    }}
  >
    {character}
  </span>
);

export default Character;
