import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useInfiniteLoading(pageNumber) {

  const [iloading, setLoading] = useState(true)
  const [ierror, setError] = useState(false)
  const [iposts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
     let cancel
     setTimeout(() => {
        axios({
          method: 'GET',
          url: '/api/v1/posts',
          params: {  page: pageNumber },
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          setPosts(prevPosts => {
            return  [...prevPosts, ...res.data.posts]
          })
          setHasMore(res.data.posts.length > 0)
          setLoading(false)
        }).catch(e => {
          if (axios.isCancel(e)) return
          setError(true)  
        })
        return () => cancel()
     }, 2000);
     
  }, [pageNumber])

  return { iloading, ierror, iposts, hasMore}
}