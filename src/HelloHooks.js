import React, { useState , useEffect } from 'react'

function HelloHooks() {
  
    const [posts , setPosts] = useState( () => {
       let posts = [] 
            
      async function test() {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => { console.log('json',json); posts = json })

        console.log('posts in usestate', posts)
        return posts; 
        
      }
      
      return test()
    })
  
    const [post , setPost] = useState({userId: 1, id: 1, title: "delectus aut autem", completed: false})
    
    useEffect(() => {
      console.log('posts',posts)
              setPosts(posts); 
     })
  
    return (
      <>
          <p>Hello Hooks</p>
        <>
          { JSON.stringify(posts) }
          <hr />
          { JSON.stringify(post) }
          </>
      </>
    )
}

export default HelloHooks