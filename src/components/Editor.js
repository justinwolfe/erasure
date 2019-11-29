import React, { useState, useEffect } from "react";

const Editor = ({ content }) => {
  const { paragraphs, url, created } = content;

  return (
    <div>
      {paragraphs &&
        paragraphs.map(paragraph => (
          <p key={paragraph.id}>
            {paragraph.words.map(word => (
              <span style={{marginLeft: '1%'}}key={word.id}>
                {word.characters.map(character => character.character).join("")}
              </span>
            ))}
          </p>
        ))}
    </div>
  );
};

export default Editor;
