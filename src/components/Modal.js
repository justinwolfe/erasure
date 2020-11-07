import React, { useState, useEffect, useRef } from "react";

const outOfBounds = {
  position: "fixed",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
  zIndex: 998,
  backgroundColor: "black",
  opacity:0.2,
  filter: "blur(4px)"
};

const container = {
  position: "fixed",
  left: "10%",
  top: "35%",
  width: "80%",
  height: "30%",
  backgroundColor: "#f2f2f2",
  color: "white",
  zIndex: 999
};

const content = {
  position: "absolute",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  width: "85%",
  height: "65%",
  color: "black"
};

const Modal = ({ children, close }) => {
  return (
    <>
      <div style={outOfBounds} onClick={() => close()}></div>
      <div style={container}>
        <div style={content}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
