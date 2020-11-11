import React, { useState, useEffect, useRef } from "react";

const spanStyle = {
  position: "relative",
  left: "-10px",
  opacity: "15%"
};

/*      <span onDoubleClick={() => toggleParagraph(name)} style={spanStyle}>
        ◦
      </span>*/

const Paragraph = ({ children, name, toggleParagraph, handleVisible }) => {
  return <p>{children}</p>;
};

export default Paragraph;
