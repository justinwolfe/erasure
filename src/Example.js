import React, { useState, useEffect } from "react"

function useFetch(url, defaultData) {
    const [data, updateData] = useState(defaultData)

    useEffect( () => {
        var data = async () => {
          const resp = await fetch(url)
          const json = await resp.json()
          updateData(json)
          console.log(json) ; 
      }
        console.log('data', data)
    }, [url])

    return data
}

function Example() {
    const [location, setLocation] = useState("Cuptertino, CA")
    const query = `https://jsonplaceholder.typicode.com/posts/1`
    const result = useFetch(query, {})
 
    return (
        <div>
            <input type="input" value={location} onChange={evt => setLocation(evt.target.value)} />
            {JSON.stringify(result)}
        </div>
    )
}

export default Example