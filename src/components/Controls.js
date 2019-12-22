import React, { useState, useEffect } from "react";

const Controls = ({ currentTouchState, setCurrentTouchState }) => {
  return (
    <div>
      <button
        style={currentTouchState ? { border: "1px solid red" } : {}}
        onClick={() => setCurrentTouchState(true)}
      >
        ◼️
      </button>
      <button
        style={!currentTouchState ? { border: "1px solid red" } : {}}
        onClick={() => setCurrentTouchState(false)}
      >
        ◻️
      </button>
    </div>
  );
};

export default Controls;
