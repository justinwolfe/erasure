import React, { useState, useEffect, useRef } from "react";

const style ={
  display:"inlineBlock"
}

const CharacterEditor = ({ character }) => <div style={style}>{character}</div>;

export default CharacterEditor;
