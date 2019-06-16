import React, { useState , useEffect, useReducer, useCallback } from 'react'


function useFetch(url, defaultData) {
  const [data, updateDate] = useState(defaultData);
  
  
  useEffect(() => {
    
    async function fetchData() {
      if(!url){
        updateDate(defaultData)
        return ; 
      }

      const resp = await fetch(url) 
      const json = resp.json()
      console.log('json', json)
      updateDate(json)
    }
    fetchData();
    
    
  }, [url])
  
  return data;
}




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
  
  const [posts , setPosts] = useFetch('https://jsonplaceholder.typicode.com/todos/',[] )
      
    // useEffect(() => {
      // console.log('posts',posts)
      // if(!posts.length){
      //   fetch('https://jsonplaceholder.typicode.com/todos/1')
      //   .then(response => response.json())
      //   .then(json => { console.log('json',json); setPosts(json);  })
      //         // setPosts(posts); 
      //   }
     // }, [posts])
  
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