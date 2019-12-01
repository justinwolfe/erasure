import React, { useState, useEffect } from "react";
import Word from "./Word";

const Editor = ({ content, toggleElement }) => {
  const { paragraphs, url, created } = content;
  const [currentTouchState, setCurrentTouchState] = useState(undefined);

  const handleTouchStart = e => {
    const firstTouch = e.target.getAttribute("data-visible");
    setCurrentTouchState();
    const key = e.target.getAttribute("name");
    if (key) {
      toggleElement(key);
    }
  };

  const handleTouchMove = e => {
    const { clientX, clientY } = e.changedTouches[0];
    const movedIntoElement = document.elementFromPoint(clientX, clientY);
    if (movedIntoElement) {
      const key = movedIntoElement.getAttribute("name");
      const visible = movedIntoElement.getAttribute("data-visible");
      if (key) {
        toggleElement(key, false);
      }
    }
  };

  return (
    <div
      style={{
        textAlign: "left",
        wordWrap: "break-word",
        cursor: "pointer",
        userSelect: "none"
      }}
      onTouchStart={e => handleTouchStart}
      onTouchMove={e => handleTouchMove}
      onTouchEnd={e => {
        console.log("te");
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
