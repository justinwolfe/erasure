import React, { useState, useEffect } from "react";

const Editor = ({ content }) => {
  const { paragraphs, url, created } = content;
  console.log(paragraphs, url, created);
  return (
    <div>
      {paragraphs.map(({ words }) => (
        <p>
          {words.map(({ characters }) => (
            <span>{characters.join()}</span>
          ))}
        </p>
      ))}
    </div>
  );
};

export default Editor;
