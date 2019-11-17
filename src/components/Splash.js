import React, {useState, useEffect} from "react";
import Mercury from '@postlight/mercury-parser';

const Splash = () => {
  const [url, setUrl] = useState('')
  const [fetchStatus, setFetchStatus] = useState({})
  const [page, setPage] = useState({})
  
  useEffect(() => {
    if(fetchStatus === 'fetching'){
      Mercury.parse(url).then(data => {
        setPage(data)
        setFetchStatus('fetched')
      }).catch(err => {
        setPage(err)
        setFetchStatus('fetched')
      })
    }
  }, [fetchStatus,url])
  
  return <div>
    <h1>erase-mark</h1>
    <div>
      <p>Enter a URL</p>
      <input value={url} onChange={(e) => setUrl(e.target.value)}/>
    </div>
    <button onClick={() => setFetchStatus('fetching')}>Start</button>
    <div>{JSON.stringify(page)}</div>
  </div>;
};

export default Splash;
