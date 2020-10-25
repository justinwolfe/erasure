import React from "react";

const style = {
  position: "sticky",
  backgroundColor: "gray",
  top: 0
};

const Controls = ({ textStyle, handleTextStyleChange, reset }) => {
  return (
    <div>
      <div>
        <button
          onClick={() =>
            handleTextStyleChange(
              "global",
              "fontSize",
              textStyle.global.fontSize + 3
            )
          }
        >
          +
        </button>
        <button
          onClick={() =>
            handleTextStyleChange(
              "global",
              "fontSize",
              textStyle.global.fontSize - 3
            )
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
