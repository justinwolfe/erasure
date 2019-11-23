import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;

const Splash = () => {
  const [url, setUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    if (fetchStatus === "fetching") {
      fetch(addProxy(url))
        .then(res => res.text())
        .then(htmlString => {
          Mercury.parse(url, {
            html: htmlString,
            contentType: "markdown"
          }).then(result => {
            if (result.content) {
              const cleaned = remove(result.content);
              setPage(cleaned);
            } else {
              setPage(JSON.stringify(result));
            }
          });
          setFetchStatus("fetched");
        })
        .catch(err => {
          alert(err);
          setPage(url);
          setFetchStatus("fetched");
        });
    }
  });

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
