import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const addProxy = url => `https://api.codetabs.com/v1/proxy?quest=${url}`;

const convertToStateV2 = document => {
  const state = [];

  document.split("\n\n").forEach((paragraph, paragraphIndex) => {
    paragraph.split(" ").forEach((word, wordIndex) => {
      state.push({
        type: "word",
        id: `${paragraphIndex}-${wordIndex}`,
        characters: word.split("").map((character, characterIndex) => {
          return {
            character,
            id: `${paragraphIndex}-${wordIndex}-${characterIndex}`,
            isMarked: false
          };
        }),
        isMarked: false,
        customCharacters: false
      });
    });
    state.push({ type: "break" });
  });

  return state;
};

const convertToState = document =>
  document.split("\n\n").map((paragraph, paragraphIndex) => ({
    words: paragraph.split(" ").map((word, wordIndex) => ({
      characters: word.split("").map((character, characterIndex) => ({
        character,
        id: `${paragraphIndex}-${wordIndex}-${characterIndex}`,
        isMarked: false
      })),
      isMarked: false,
      id: `${paragraphIndex}-${wordIndex}`,
      customCharacters: false
    })),
    id: `${paragraphIndex}`,
    isMarked: false
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
          console.log(result);
          if (result.content) {
            let cleanedContent = remove(result.content)
              .replace(/[\[\]\(\)]/gm, "")
              .replace(
                /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
                ""
              )
              .replace(/\n\s*\n/g, "\n\n");
            if (result.title) {
              cleanedContent = `${result.title}

${cleanedContent}`;
            }
            const converted = convertToStateV2(cleanedContent);
            resolve({ meta: result, page: converted });
          } else {
            reject(JSON.stringify(result));
          }
        });
      })
      .catch(err => {
        reject(JSON.stringify(err));
      });
  });

export const handleScreenshot = () => {
  domtoimage.toBlob(document.querySelector("#content")).then(function(blob) {
    window.saveAs(blob, "my-node.png");
  });
};

export const setLocalStorage = (key, dataObject) => {
  window.localStorage.setItem(key, JSON.stringify(dataObject));
};

export const getLocalStorage = key => {
  const stored = localStorage.getItem(key);
  try {
    return JSON.parse(stored);
  } catch (err) {
    return undefined;
  }
};
