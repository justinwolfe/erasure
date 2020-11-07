import React from "react";
import styled from "styled-components";

const Character = ({ character, isMarked, textStyle }) => (
  <span
    style={{
      ...textStyle.global,
      ...(isMarked ? textStyle.marked : textStyle.unmarked)
    }}
  >
    {character}
  </span>
);

export default Character;
