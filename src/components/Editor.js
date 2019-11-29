import React, { useState, useEffect } from "react";

const Editor = ({ content }) => {
  return <div>{JSON.stringify(content)}</div>;
};

export default Editor;
