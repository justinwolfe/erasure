import React, { useState, useEffect } from "react";

const style = {
  position: "sticky",
  backgroundColor: "gray",
  top: 0
};

const Controls = ({
  markType,
  handleMarkTypeChange,
  handleScreenshot,
  screenshotLink,
  textStyle,
  handleTextStyleChange
}) => {
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
      </div>
      <div style={style}>
        <button onClick={() => handleMarkTypeChange(!markType)}>
          {markType ? "◻️" : "◼️"}
        </button>
        <button onClick={handleScreenshot}>📸</button>
        {screenshotLink && <a href={screenshotLink}>📁</a>}
      </div>
    </div>
  );
};

export default Controls;
