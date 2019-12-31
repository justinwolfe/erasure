import React, { useState, useEffect } from "react";

const style = {
  position:'sticky',
  backgroundColor: 'gray',
  top: 0
}

const Controls = ({ currentTouchType, handleTouchTypeChange }) => {
  return (
    <div style={style}>
      <button
        style={currentTouchType ? { border: "1px solid red" } : {}}
        onClick={() => handleTouchTypeChange(true)}
      >
        ◼️
      </button>
      <button
        style={!currentTouchType ? { border: "1px solid red" } : {}}
        onClick={() => handleTouchTypeChange(false)}
      >
        ◻️
      </button>
      <button
        onClick={}>
        📸
      </button>
    </div>
  );
};

export default Controls;
