import React, { useState, useEffect } from "react";
import Word from "./Word";

const Editor = ({ content, toggleElement }) => {
  const { paragraphs, url, created } = content;

  return (
    <div
      style={{
        textAlign: "left",
        wordWrap: "break-word",
        cursor: "pointer",
        userSelect: "none"
      }}
    >
      {paragraphs &&
        paragraphs.map(paragraph => (
          <p
            onTouchMove={e => {
              console.log("tm", e.target.innerText)
              console.log(e.clientX, e.clientY)
              //document.elementsFromPoint(e.clientX, e.clientY)
            }}
            className="paragraph"
            key={paragraph.id}
          >
            {paragraph.words.map(word => (
              <Word
                characters={word.characters}
                key={word.id}
                id={word.id}
                isVisible={word.isVisible}
                toggleElement={toggleElement}
              />
            ))}
          </p>
        ))}
    </div>
  );
};

export default Editor;
