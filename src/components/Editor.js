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
      onTouchStart={e => {
        console.log(ts)
      }}
      onTouchMove={e => {
        const myLocation = e.changedTouches[0];
        console.log(myLocation.clientX, myLocation.clientY);
        const touching = document.elementFromPoint(
          myLocation.clientX,
          myLocation.clientY
        );
        if (touching) {
          const key = touching.getAttribute("name");
          if (key) {
            console.log(key);
            console.log(touching.innerText, false);
            toggleElement(key);
          }
        }
      }}
    >
      {paragraphs &&
        paragraphs.map(paragraph => (
          <p className="paragraph" key={paragraph.id} name={paragraph.id}>
            {paragraph.words.map(word => (
              <Word
                characters={word.characters}
                key={word.id}
                id={word.id}
                name={word.id}
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
