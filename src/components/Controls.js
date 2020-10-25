import React from "react";

const style = {
  position: "sticky",
  backgroundColor: "gray",
  top: 0
};

const Controls = ({ textStyle, reset, dispatch }) => {
  return (
    <div>
      <div>
        <button
          onClick={() =>
            dispatch("updateTextStyle", {
              parentKey: "global",
              propertyKey: "fontSize",
              operation: 'increment'
            })
          }
        >
          +
        </button>
        <button
          onClick={() =>
            dispatch("updateTextStyle", {
              parentKey: "global",
              propertyKey: "fontSize",
              operation: 'decrement'
            })
          }
        >
          -
        </button>
        <button onClick={() => reset()}>reset</button>
      </div>
      <div style={style}></div>
    </div>
  );
};

export default Controls;
