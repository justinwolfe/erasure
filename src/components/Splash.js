import React, { useState, useEffect } from "react";
import Mercury from "@postlight/mercury-parser";

const addProxy = url => `https://cors-anywhere.herokuapp.com/${url}`;

const Splash = () => {
  const [url, setUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState({});
  const [page, setPage] = useState('');

  useEffect(() => {
    if (fetchStatus === "fetching") {
      fetch(addProxy(url))
        .then(res => res.text())
        .then(data => {
          console.log(data);
          setPage(data);
          setFetchStatus('fetched')
        })
        .catch(err => {
          alert(err)
          setPage('butt');
          setFetchStatus('fetched')
        });
    }
  })
    /*Mercury.parse(addProxy(url)).then(data => {
        setPage(JSON.stringify(data))
        setFetchStatus('fetched')
      }).catch(err => {
        setPage(JSON.stringify(err))
        setFetchStatus('fetched')
      })
  }, [fetchStatus, url]);
*/
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
