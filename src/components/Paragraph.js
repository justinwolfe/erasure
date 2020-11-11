import React, { useState, useEffect, useRef } from "react";

const spanStyle = {
  position: "relative",
  left: "-10px",
};

const Paragraph = ({ children, toggleParagraph, handleVisible }) => {
  return (
    <p>
      {handleVisible && (
        <span onDoubleClick={toggleParagraph} style={spanStyle}>
          #
        </span>
      )}
      {children}
    </p>
  );
};

export default Paragraph;
