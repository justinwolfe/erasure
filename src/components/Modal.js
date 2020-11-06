import React, { useState, useEffect, useRef } from "react";

const container = {
  position: "fixed",
  left: "10%",
  top: "20%",
  width: "80%",
  height: "50%",
  backgroundColor: "black",
  color:"white",
  zIndex: 999
}

const cornerButton = {
  position: "absolute",
  right:"2%",
  top:"2%",
  fontSize:"1em",
}

const content = {
  position: "absolute",
  left: "50%",
  top: "50%",
  webkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  width:"50%",
  height:"50%",
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