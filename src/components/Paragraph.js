import React from "react";

const spanStyle = {
  position: "absolute",
  left: "-10%",
  opacity: "15%"
};

const Paragraph = ({ children, name, toggleParagraph, handleVisible }) => {
  return (
    <p>
      {handleVisible && (
        <span onDoubleClick={() => toggleParagraph(name)} style={spanStyle}>
          ◦
        </span>
      )}
      {children}
    </p>
  );
};

export default Paragraph;
