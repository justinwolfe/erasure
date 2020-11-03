import { defaultStyle} from './data'

export const initialState = {
  meta: undefined,
  error: false,
  page: undefined,
  style: defaultStyle
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "loadFromStorage":
      draft = action.data;
      return draft;
    case "loadContent":
      draft.page = action.data.page;
      draft.meta = action.data.meta;
      return draft;
    case "toggleWord":
      const [paragraphIndex, wordIndex] = action.data.key.split("-");
      if (draft.page[paragraphIndex].words[wordIndex]) {
        if (typeof action.data.marker === "undefined") {
          draft.page[paragraphIndex].words[wordIndex].isMarked = !draft.page[
            paragraphIndex
          ].words[wordIndex].isMarked;
        } else {
          draft.page[paragraphIndex].words[wordIndex].isMarked =
            action.data.marker;
        }
      }
      return draft;
    case "toggleCharacter":
      return draft;
    case "updateTextStyle":
      const currentValue =
        draft.style.text[action.data.parentKey][action.data.propertyKey];
      if (action.data.operation === "increment") {
        draft.style.text[action.data.parentKey][action.data.propertyKey] =
          currentValue + 1;
      } else if (action.data.operation === "decrement") {
        draft.style.text[action.data.parentKey][action.data.propertyKey] =
          currentValue - 1;
      } else {
      }
      return draft;
  }
};
