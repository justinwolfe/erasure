import React from "react";

const style = {
  display: "inline-block",
  border: "1px solid black",
  padding: "2%",
  margin: "2%",
  fontSize: "2"
};

const CharacterEditor = ({
  character,
  id,
  textStyle,
  isMarked,
  toggleMark
}) => (
  <div
    style={{
      ...style,
      ...(isMarked ? textStyle.marked : textStyle.unmarked)
    }}
    onClick={() => toggleMark(id)}
  >
    {character}
  </div>
);

export default CharacterEditor;
