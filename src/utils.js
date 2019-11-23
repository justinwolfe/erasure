import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;

export const getContentFromUrl = url => new Promise((resolve, reject) => {
  fetch(addProxy(url))
        .then(res => res.text())
        .then(htmlString => {
          Mercury.parse(url, {
            html: htmlString,
            contentType: "markdown"
          }).then(result => {
            if (result.content) {
              const cleaned = remove(result.content);
              resolve(cleaned)
            } else {
              reject(JSON.stringify(result));
            }
          });
        })
        .catch(err => {
          reject(JSON.stringify(err))
        }); 
});
