import React from "react";

const spanStyle = {
  position: "absolute",
  left: "9%",
  paddingLeft:"1%",
  paddingRight:"1%",
  opacity: "30%"
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
