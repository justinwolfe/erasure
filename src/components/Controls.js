import React from "react";

const increment = (propertyKey, parentKey) => {
  return {
    type: "updateTextStyle",
    data: {
      parentKey: parentKey || "global",
      propertyKey: propertyKey,
      operation: "increment"
    }
  };
};

const decrement = (propertyKey, parentKey) => {
  return {
    type: "updateTextStyle",
    data: {
      parentKey: parentKey || "global",
      propertyKey: propertyKey,
      operation: "decrement"
    }
  };
};

const toggleMode = () => {
  
}

const Controls = ({ textStyle, dispatch, reset }) => {
  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment("fontSize"))}>+</button>
        <button onClick={() => dispatch(decrement("fontSize"))}>-</button>
        <button onClick={() => reset()}>reset</button>
      </div>
    </div>
  );
};

export default Controls;
