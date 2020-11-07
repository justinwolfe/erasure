import React from "react";
import styled from "styled-components";

const Character = ({ character, isMarked, textStyle }) => 
  <React.Fragment>
    <span
      style={{
        ...textStyle.global,
        ...(isMarked ? textStyle.marked : textStyle.unmarked)
      }}
    >
      {character}
    </span>
  </React.Fragment>


export default Character;
