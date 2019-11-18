import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;
/*
const renderText = htmlString => {
  const renderer = new DOMParser();
  const doc = renderer.parseFromString(htmlString, "text/html");
  var turndownService = new TurndownService();
  var markdown = turndownService.turndown(doc);
  return markdown;
};*/

const Splash = () => {
  const [url, setUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    if (fetchStatus === "fetching") {
      fetch(addProxy(url))
        .then(res => res.text())
        .then(htmlString => {
          //setPage(renderText(htmlString));
          //setPage(url)
          Mercury.parse(url, {
            html: htmlString, contentType: 'text'
          }).then(result => {
            if (result.content) {
              setPage(result.content);
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
      <div>{page}</div>
    </div>
  );
};

export default Splash;
