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
  const [currentTouchState, setCurrentTouchState] = useState(undefined);

  const handleTouchStart = e => {
    const firstTouchedElementIsVisible = e.target.getAttribute("data-visible");
    if(firstTouchedElementIsVisible === "false"){
      setCurrentTouchState(true)
    }
    const key = e.target.getAttribute("name");
    if (key) {
      toggleElement(key, currentTouchState);
    }
  };

  const handleTouchEnd = e => {
  };

  const handleTouchMove = e => {
    const { clientX, clientY } = e.changedTouches[0];
    const movedIntoElement = document.elementFromPoint(clientX, clientY);
    if (movedIntoElement) {
      const key = movedIntoElement.getAttribute("name");
      console.log("tm", e.innerText, currentTouchState)
      if (key) {
        toggleElement(key, false);
      }
    }
  };

  return (
    <div
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      //onTouchEnd={handleTouchEnd}
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
