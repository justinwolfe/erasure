import React from "react";

const spanStyle = {
  position: "relative",
  left: "-10px",
  opacity: "100%",
};

/*      <span onDoubleClick={() => toggleParagraph(name)} style={spanStyle}>
        ◦
      </span>*/

const Paragraph = ({ children, name, toggleParagraph, handleVisible }) => {
  return (
    <React.Fragment>
      <p>
        <span onDoubleClick={() => toggleParagraph(name)} style={spanStyle}>
          ◦
        </span>
        {children}
      </p>
    </React.Fragment>
  );
};

export default Paragraph;
