import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;

const convertToNestedArray = page => {
  const paragraphArray = page.split("\n\n")
  const paragraphArrayWithWordArray = paragraphArray.map(paragraph => {
    const wordArray = paragraph.split(" ")
    const letterArray = wordArray.map(word => word.split(""))
  })
  return paragraphArray
}

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
            const converted = convertToNestedArray(cleaned)
            resolve(JSON.stringify(converted));
          } else {
            reject(JSON.stringify(result));
          }
        });
      })
      .catch(err => {
        reject(JSON.stringify(err));
      });
  });
