import React, {useState, useEffect} from "react";
import Mercury from '@postlight/mercury-parser';

const Splash = () => {
  const [url, setUrl] = useState('')
  const [fetchStatus, setFetchStatus] = useState({})

  useEffect(() => {
    if(fetchStatus === 'fetching'){
      Mercury.parse(url).then(data => {
        console.log(data)
      })
    }
  }, [fetchStatus])
  return <div>
    <h1>erase-mark</h1>
    <div>
      <p>Enter a URL</p>
      <input/>
    </div>
    <button onClick={() => setFetchStatus('fetching')}>Start</button>
  </div>;
};

export default Splash;
