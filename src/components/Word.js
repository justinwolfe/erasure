import React from "react";
import styled from "styled-components";
import Character from "./Character";

/*
        {characters.map(
          ({ character, id: characterId, isMarked: characterIsMarked }) => (
            <Character
              key={characterId}
              character={character}
              textStyle={textStyle}
              isMarked={characterIsMarked}
            />
          )
        )}
*/

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
        {characters.map(character => character.character).join("")}
      </span>{" "}
    </React.Fragment>
  );
};

export default Word;
