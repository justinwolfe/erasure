import React, { useState, useEffect } from "react";
import Word from "./Word";
import Controls from "./Controls"

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
    const key = e.target.getAttribute("name");
    if (!key) return;
    toggleElement(key, currentTouchState);
  };

  const handleTouchEnd = e => {};

  const handleTouchMove = e => {
    const { clientX, clientY } = e.changedTouches[0];
    const movedIntoElement = document.elementFromPoint(clientX, clientY);
    if (movedIntoElement) {
      const key = movedIntoElement.getAttribute("name");
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
      //onTouchEnd={handleTouchEnd}
    >
      <Controls setCurrentTouchState={setCurrentTouchState}/>
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
