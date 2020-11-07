import React from "react";
import styled from "styled-components";
import Character from "./Character";

const Word = ({ characters, id, isMarked, name, textStyle }) => {
  return (
    <React.Fragment>
      <span
        name={id}
        style={{
          ...textStyle.global,
          ...(isMarked ? textStyle.marked : textStyle.unmarked)
        }}
      >
        {characters.map(({ character, id isMarked: characterIsMarked }) => (
          <Character
            key={characterId}
            character={character}
            textStyle={textStyle}
            isMarked={characterIsMarked}
          />
        ))}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
