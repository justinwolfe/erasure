import React, { useState, useEffect } from "react";

const Controls = ({ currentTouchType, handleTouchTypeChange }) => {
  return (
    <div>
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
    </div>
  );
};

export default Controls;
