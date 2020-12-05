import React from "react";

const spanStyle = {
  position: "absolute",
  left: "10%",
  opacity: "30%",
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
