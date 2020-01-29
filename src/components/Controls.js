import React, { useState, useEffect } from "react";

const style = {
  position: "sticky",
  backgroundColor: "gray",
  top: 0
};

const Controls = ({
  currentTouchType,
  handleTouchTypeChange,
  handleScreenshot,
  screenshotLink
}) => {
  return (
    <div>
      <div>
        <button onClick={() => {
            
          }}>+</button>
        <button onClick={() => {
            
          }}>-</button>
      </div>
      <div style={style}>
        <button onClick={() => handleTouchTypeChange(!currentTouchType)}>
          {currentTouchType ? "◼️" : "◻️"}
        </button>
        <button onClick={handleScreenshot}>📸</button>
        {screenshotLink && <a href={screenshotLink}>📁</a>}
      </div>
    </div>
  );
};

export default Controls;
