import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;

const convertToState = document =>
  document.split("\n\n").map((paragraph, paragraphIndex) => ({
    words: paragraph.split(" ").map((word, wordIndex) => ({
      word: word.split("").map((character, characterIndex) => ({
        character,
        id: `p${paragraphIndex}-w${wordIndex}-c${characterIndex}`,
        visible: true
      })),
      visible: true,
      id: `p${paragraphIndex}-w${wordIndex}`
    })),
    visible: true,
    id: `p${paragraphIndex}`
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
