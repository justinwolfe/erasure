import React, { memo } from "react";
import styled from "styled-components";
import Character from "./Character";

const simpleWord = characters =>
  characters.map(character => character.character).join("");

const customWord = (characters, textStyle) =>
  characters.map(
    ({ character, id: characterId, isMarked: characterIsMarked }) => (
      <Character
        key={characterId}
        character={character}
        textStyle={textStyle}
        isMarked={characterIsMarked}
      />
    )
  );

const Word = ({
  characters,
  id,
  isMarked,
  name,
  textStyle,
  customCharacters
}) => {
  const content = !customCharacters
    ? simpleWord(characters)
    : customWord(characters, textStyle);
  console.log(`rendered word ${id}`)
  return (
    <>
      <span
        name={id}
        style={{
          ...textStyle.global,
          ...(isMarked ? textStyle.marked : textStyle.unmarked)
        }}
      >
        {content}
      </span>{" "}
    </>
  );
};

const MemoizedWord = memo(Word);

export default MemoizedWord;
