import React, { useState, useEffect } from "react"

function useFetch(url, defaultData) {
    const [data, updateData] = useState(defaultData)

    useEffect(  async () => {
          const resp = await fetch(url)
          const json = await resp.json()
          updateData(json)
          console.log('json', json) ; 
       // console.log('data', data)
    }, [url])

    return data
}

function Example() {
    const [location, setLocation] = useState("Cuptertino, CA")
    const query = `https://jsonplaceholder.typicode.com/posts/1`
    const result = useFetch(query, {})
 
    return (
        <div>
          <hr />
            {JSON.stringify(result)}
        </div>
    )
}

export default Example