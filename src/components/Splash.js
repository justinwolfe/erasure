import React, { useState, useEffect } from "react";
import {getContentFromUrl} from '../utils'

const Splash = ({selectContent}) => {
  const [url, setUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");
  const [page, setPage] = useState("");
  
  useEffect(() => {
    if(fetchStatus === "fetching"){
      getContentFromUrl(url)
        .then(data => {
        setPage(data)
        setFetchStatus("fetched");
      }).catch(err => {
        setPage(err)
        setFetchStatus("fetched");
      })
    }
  })

  return (
    <div>
      <h1>erase-mark</h1>
      <div>
        <p>Enter a URL</p>
        <input value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <button onClick={() => setFetchStatus("fetching")}>Start</button>
      <div style={{ whiteSpace: "pre-line" }}>{page}</div>
    </div>
  );
};

export default Splash;
