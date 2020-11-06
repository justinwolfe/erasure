import React, { useState, useEffect, useRef } from "react";

const style = {
  position: "fixed",
  left: "10%",
  top: "20%",
  width: "80%",
  height: "50%",
  backgroundColor: "black",
  color:"white",
  zIndex: 999
}

const Modal = ({children}) => {
  return <div style={style}>
    {children}
  </div>
}

export default Modal