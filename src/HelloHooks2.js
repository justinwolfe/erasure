import React, { useState , useEffect, useReducer, useCallback } from 'react'

function HelloHooks2() {
  
//     const [posts , setPosts] = useState( () => {
//        // let posts = [] 
            
//       async function test() {
//         await fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(response => response.json())
//         .then(json => { console.log('json',json); posts = json })

//         console.log('posts in usestate', posts)
//         return posts; 
        
//       }
//       let  posts = test();  
//       console.log('posts returned', posts)
//       return posts
//     })
  
  const [posts , setPosts] = useState({})
  const [post , setPost] = useState({userId: 1, id: 1, title: "delectus aut autem", completed: false})
    
    useEffect(() => {
      // console.log('posts',posts)
      // if(!posts.length){
      //   fetch('https://jsonplaceholder.typicode.com/todos/1')
      //   .then(response => response.json())
      //   .then(json => { console.log('json',json); setPosts(json);  })
      //         // setPosts(posts); 
      //   }
     }, [posts])
  
    return (
      <>
          <p>Hello Hooks2</p>
        <>
          { JSON.stringify(posts) }
          <hr />
          { JSON.stringify(post) }
          </>
      </>
    )
}

export default HelloHooks2