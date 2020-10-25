const initialState = {
  content: undefined,
  meta: undefined,
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

const reducer = (draft, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return void draft.count++;
    case "decrement":
      return void draft.count--;
  }
};
