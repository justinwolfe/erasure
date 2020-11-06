import React, { useState, useEffect, useRef } from "react";

const container = {
  position: "fixed",
  left: "10%",
  top: "35%",
  width: "80%",
  height: "30%",
  backgroundColor: "black",
  color:"white",
  zIndex: 999
}

const cornerButton = {
  position: "absolute",
  right:"0",
  top:"0",
  fontSize:"1em",
  padding:"1%",
  border:"1px solid red"
}

const content = {
  position: "absolute",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  width:"85%",
  height:"65%",
  border:"1px solid red"
}

const Modal = ({children, closeModal}) => {
  return <div style={container}>
    <div style={cornerButton} onClick={() => closeModal()}>x</div>
    <div style={content}>
      {children}
    </div>
  </div>
}

export default Modal