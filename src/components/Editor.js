import React, { useState, useEffect } from "react";
import Word from "./Word";

const Editor = ({ content }) => {
  const { paragraphs, url, created } = content;

  return (
    <div style={{ textAlign: "left", wordWrap: "break-word" }}>
      {paragraphs &&
        paragraphs.map(paragraph => (
          <p className="paragraph" key={paragraph.id}>
            {paragraph.words.map(word => (
              <Word
                characters={word.characters}
                key={word.id}
                isVisible={word.isVisible}
              />
            ))}
          </p>
        ))}
    </div>
  );
};

export default Editor;
