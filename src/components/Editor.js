import React, { useState, useEffect } from "react";
import Word from "./Word";
import Controls from "./Controls";
import debounce from "just-debounce";

const style = {
  textAlign: "left",
  wordWrap: "break-word",
  cursor: "pointer",
  userSelect: "none"
};

const keyCache= []

const Editor = ({ content, toggleElement }) => {
  const { paragraphs, url, created } = content;
  const [currentTouchState, setCurrentTouchState] = useState(false);

  const handleTouchStart = e => {
    e.preventDefault()
    const key = e.target.getAttribute("name");
    if (!key) return;
    ke
    toggleElement(key, currentTouchState);
  };

  const handleTouchEnd = e => {};
  
  let counter = 0

  const handleTouchMove = e => {
    e.preventDefault()
    counter++
    console.log(counter);
    const { clientX, clientY } = e.changedTouches[0];
    const movedIntoElement = document.elementFromPoint(clientX, clientY);
    if (movedIntoElement) {
      const key = movedIntoElement.getAttribute("name");
      if (key) {
        toggleElement(key, currentTouchState);
      }
    }
  };

  const debouncedMove = e => debounce(handleTouchMove(e), 500);

  return (
    <div
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={debouncedMove}
    >
      <Controls
        currentTouchState={currentTouchState}
        setCurrentTouchState={setCurrentTouchState}
      />
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
