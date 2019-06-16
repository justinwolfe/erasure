import React, { useState } from 'react'

function HelloHooks() {
  
    const [posts , setPosts] = useState(() => {
       let posts = [] 
      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => { posts = json })
    })
  
  
    return (
      <>
          <p>Hello Hooks</p>
        <>
          { JSON.stringify(posts) }
          </>
      </>
    )
}

export default HelloHooks