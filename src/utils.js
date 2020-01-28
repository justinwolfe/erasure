import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;

const convertToState = document =>
  document.split("\n\n").map((paragraph, paragraphIndex) => ({
    words: paragraph.split(" ").map((word, wordIndex) => ({
      characters: word.split("").map((character, characterIndex) => ({
        character,
        id: `${paragraphIndex}-${wordIndex}-${characterIndex}`,
        isVisible: true
      })),
      isVisible: true,
      id: `${paragraphIndex}-${wordIndex}`
    })),
    isVisible: true,
    id: `${paragraphIndex}`
  }));

export const getContentFromUrl = url =>
  new Promise((resolve, reject) => {
    fetch(addProxy(url))
      .then(res => res.text())
      .then(htmlString => {
        Mercury.parse(url, {
          html: htmlString,
          contentType: "markdown"
        }).then(result => {
          if (result.content) {
            const cleaned = remove(result.content)
              .replace(/[\[\]\(\)]/gm, "")
              .replace(
                /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
                ""
              )
              .replace(/\n\s*\n/g, "\n\n");
            console.log(convertToState(cleaned));
            const converted = convertToState(cleaned);
            resolve(converted);
          } else {
            reject(JSON.stringify(result));
          }
        });
      })
      .catch(err => {
        reject(JSON.stringify(err));
      });
  });

export const toggleElement = (id, value, content, setContent) => {
  const [paragraphIndex, wordIndex, characterIndex] = id.split("-");
  const newContent = { ...content };
  const word = newContent.paragraphs[paragraphIndex].words[wordIndex];
  if (word) {
    if (value === false || value === true) {
      word.isVisible = value;
    } else {
      word.isVisible = !word.isVisible;
    }
  }
  setContent(newContent);
};

export const handleScreenshot = () => {
  domtoimage.toBlob(document.querySelector("#content")).then(function(blob) {
    window.saveAs(blob, "my-node.png");
  });
};
