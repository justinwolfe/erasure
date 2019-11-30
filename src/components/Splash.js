import React, { useState, useEffect } from "react";
import { getContentFromUrl } from "../utils";

const Splash = ({ setContent, setCurrentError }) => {
  const [url, setUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");
  useEffect(() => {
    if (fetchStatus === "fetching") {
      getContentFromUrl(url)
        .then(data => {
          setContent({paragraphs: data, url, created: Date.now()});
        })
        .catch(err => {
          setCurrentError(err);
          setFetchStatus("fetched");
        });
    }
  }, [fetchStatus]);

  return (
    <div>
      <h1>erase-mark</h1>
      <div>
        <p>Enter a URL</p>
        <input value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <button onClick={() => setFetchStatus("fetching")}>Start</button>
    </div>
  );
};

export default Splash;
