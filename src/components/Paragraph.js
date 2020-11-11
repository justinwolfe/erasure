import React, { useState, useEffect, useRef } from "react";

const spanStyle = {
  position: "relative",
  left: "-10px",
  opacity: "15%"
};

const Paragraph = ({ children, name, toggleParagraph, handleVisible }) => {
  return (
    <p>
      <span onDoubleClick={() => toggleParagraph(name)} style={spanStyle}>
        ◦
      </span>
      {children}
    </p>
  );
};

export default Paragraph;
