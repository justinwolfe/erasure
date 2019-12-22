import React, { useState, useEffect } from "react";

const Controls = ({ setCurrentTouchState }) => {
  return (
    <div>
      <button onClick={() => setCurrentTouchState(true)}>◼️</button>
      <button onClick={() => setCurrentTouchState(false)}>◻️</button>
    </div>
  );
};

export default Controls;
