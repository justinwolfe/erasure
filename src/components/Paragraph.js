import React from "react";

const spanStyle = {
  position: "absolute",
  left: "-10px",
  opacity: "100%",
};

const Paragraph = ({ children, name, toggleParagraph, handleVisible }) => (
  <p>
    {handleVisible && (
      <span onDoubleClick={() => toggleParagraph(name)} style={spanStyle}>
        ◦
      </span>
    )}
    {children}
  </p>
);

export default Paragraph;
