import React, {useState, useEffect} from "react";
import Mercury from '@postlight/mercury-parser';

//using Google as a proxy to avoid paywall issues
const addProxy = url => `http://googleweblight.com/?lite_url=${url}`

const Splash = () => {
  const [url, setUrl] = useState('')
  const [fetchStatus, setFetchStatus] = useState({})
  const [page, setPage] = useState({})
  
  useEffect(() => {
    if(fetchStatus === 'fetching'){
      fetch(url)
        .then(res => res.html())
        .then(data => {
          console.log(data)
          setPage(data)
        })
        .catch(err => {
        setPage(err)
      })
      setFetchStatus('fetched')
      }
      /*Mercury.parse(url).then(data => {
        setPage(data)
        setFetchStatus('fetched')
      }).catch(err => {
        setPage(err)
        setFetchStatus('fetched')
      })*/
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
