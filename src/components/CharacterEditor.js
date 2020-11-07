import React, { useState, useEffect, useRef } from "react";

const style ={
  display:"inline-block",
  border:"1px solid black",
  padding:"2%",
  margin:"2%"
}

const CharacterEditor = ({ character }) => <div style={style}>{character}</div>;

export default CharacterEditor;
