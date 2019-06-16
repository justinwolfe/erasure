import React, { useState , useEffect, useReducer, useCallback } from 'react'


function useFetch(url, defaultData) {
  const [data, updateDate] = useState(defaultData);
  
  
  useEffect(() => {
    
    async function fetchData() {
      if(!url){
        updateDate(defaultData)
        return ; 
      }

      const resp = await  fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => json)
              
      const json = resp
      console.log('json', json)
      updateDate(json)
    }
    fetchData();
    
    
  }, [url])
  
  return data;
}

function HelloHooks2() {
    
  const [posts , setPosts] = useFetch('https://jsonplaceholder.typicode.com/todos/',[] )
  
    return (
      <>
        <hr />
          <p>Hello Hooks2</p>
        <>
          { JSON.stringify(posts) }
          
          </>
      </>
    )
}

export default HelloHooks2