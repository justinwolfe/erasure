import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const addProxy = url => `https://erasure-proxy.glitch.me/?url=${url}`;

const convertToStateV3 = text => {
  text.split("\n\n").reduce((paragraph, paragraphIndex) => {
    
  }, {});
};

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
    state.push({ type: "break", id: `break-after-${paragraphIndex}` });
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

const convertHtmlToPlain = html => {
  var container = document.createElement("div");
  container.innerHTML = html;
  return container.textContent || container.innerText || "";
};

export const getContentFromUrl = async url => {
  try {
    const response = await fetch(addProxy(url));
    console.log(response)
    const inputHtml = await response.text();
    const parsed = await Mercury.parse(url, {
      html: inputHtml,
      contentType: "markdown"
    });

    if (!parsed.content) {
      parsed.content === convertHtmlToPlain(inputHtml);
    }

    let cleanedContent = remove(parsed.content)
      .replace(/[\[\]\(\)]/gm, "")
      .replace(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
        ""
      )
      .replace(/\n\s*\n/g, "\n\n");

    if (parsed.title) {
      cleanedContent = `${parsed.title}

${cleanedContent}`;
    }

    const converted = convertToStateV2(cleanedContent);
    const metaWithoutContent = { ...parsed };
    delete metaWithoutContent.content;

    return { meta: metaWithoutContent, page: converted };
  } catch (err) {
    console.log(err);
  }
};

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
