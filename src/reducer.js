export const initialState = {
  content: undefined,
  original: undefined,
  meta: undefined,
  error: false,
  text: {
    global: {
      fontSize: 20,
      fontFamily: "Helvetica, Arial",
      lineHeight: "1.4"
    },
    marked: {
      opacity: "5%"
    },
    unmarked: {
      opacity: "100%"
    }
  }
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "loadLocalStorage": 
      return draft
    case "loadContent":
      draft.content = action.content;
      draft.meta = action.meta;
      return draft
    case "toggleWord": 
      return draft
    case "toggleCharacter":
      return draft
  }
};


