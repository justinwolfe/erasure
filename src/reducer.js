import { defaultStyle } from "./data";

export const initialState = {
  meta: undefined,
  error: false,
  page: undefined,
  style: defaultStyle,
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
    case "updateContent":
      draft.page = action.data;
      return draft;
    case "editWord": {
      const [paragraphIndex, wordIndex] = action.data.key.split("-");
      const word = draft.page.find((word) => word.id === action.data.key);
      word.characters = action.data.characters;
      word.customCharacters = true;
      return draft;
    }
    default:
      return draft;
  }
};
