import React, { useState, useEffect } from "react";
import Word from "./Word";

const style = {
  textAlign: "left",
  wordWrap: "break-word",
  cursor: "pointer",
  userSelect: "none"
};

const Editor = ({ content, toggleElement }) => {
  const { paragraphs, url, created } = content;
  const [currentTouchState, setCurrentTouchState] = useState(false);

  const handleTouchStart = e => {
    console.log("ts", currentTouchState);
    const firstTouch = e.target.getAttribute("data-visible");
    console.log(firstTouch)
    if (firstTouch) {
      setCurrentTouchState(firstTouch);
    }
    const key = e.target.getAttribute("name");
    if (key) {
      toggleElement(key, currentTouchState);
    }
  };

  const handleTouchEnd = e => {
    setCurrentTouchState(false);
  };

  const handleTouchMove = e => {
    console.log("tm", currentTouchState);
    const { clientX, clientY } = e.changedTouches[0];
    const movedIntoElement = document.elementFromPoint(clientX, clientY);
    if (movedIntoElement) {
      const key = movedIntoElement.getAttribute("name");
      const visible = movedIntoElement.getAttribute("data-visible");
      if (key) {
        toggleElement(key, currentTouchState);
      }
    }
  };

  return (
    <div
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
