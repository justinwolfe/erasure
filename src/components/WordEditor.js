import React, { useState, useEffect, useRef } from "react";
import Modal from './Modal'
import Letter from "./Letter"

const WordEditor = ({word, close}) => {
 return <Modal close={close}>
   <div>
     {JSON.stringify(word)}
   </div>
 </Modal>
}

export default WordEditor