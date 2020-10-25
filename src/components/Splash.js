import React, { useState, useEffect } from "react";
import { getContentFromUrl } from "../utils";

const Splash = ({ setCurrentError, dispatch }) => {
  const [url, setUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");

  useEffect(() => {
    if (fetchStatus === "fetching") {
      getContentFromUrl(url)
        .then(data => {
          dispatch({type:'loadContent', data})
        })
        .catch(err => {
          setCurrentError(err);
          setFetchStatus("fetched");
        });
    }
  }, [fetchStatus]);

  return (
    <div style={{ fontSize: "20px" }}>
      <h1>erase-mark</h1>
      {fetchStatus !== "fetching" && (
        <div>
          <div>
            <p>Enter a URL</p>
            <input
              style={{ fontSize: "20px" }}
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
          <button
            style={{ fontSize: "20px" }}
            onClick={() => setFetchStatus("fetching")}
          >
            Start
          </button>
        </div>
      )}
      {fetchStatus === "fetching" && (
        'Loading article—may take a moment'
      )}
    </div>
  );
};

export default Splash;
