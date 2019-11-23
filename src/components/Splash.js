import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";
import remove from "remove-markdown";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;

const cleanMarkdown = markdown => {
  let cleanedDoc = markdown;
  const linkRegex = /\[(.+)]\((.*)\)/gm;
  const matches = [...markdown.matchAll(linkRegex)];
  matches.forEach(match => {
    let replacement = match[1];
    console.log("match0", match[0])
    console.log("replacement", replacement)
    if (match[2]) {
      replacement = match[2];
    }
    cleanedDoc = cleanedDoc.replace(match[0], replacement);
  });
  return cleanedDoc;
};

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
              const cleaned = cleanMarkdown(result.content);
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
