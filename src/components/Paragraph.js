import React, { useState, useEffect, useRef } from "react";

const spanStyle = {
  position: "relative",
  left: "-10px",
  display:"none"
};

const Paragraph = ({ children, toggleParagraph }) => {
  return (
    <p>
      <span onDoubleClick={toggleParagraph} style={spanStyle}>#</span>
      {children}
    </p>
  );
};

export default Paragraph;
