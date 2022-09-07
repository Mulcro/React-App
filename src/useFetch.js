import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error,setError] = useState(false)

      useEffect( () => {
        setTimeout(()=>{
          fetch(url)
          .then(res => {
            if(!res.ok){
              throw Error('Resource not found')
            }
            return res.json()
          })
          .then(data =>{
            setData(data['blogs'])
            setIsPending(false)
            setError(null)
          })
          .catch((err)=>{
            setError(err.message)
            setIsPending(false)
          })
        }, 1500)
      }, []);

      return {data, isPending, error}
}

export default useFetch