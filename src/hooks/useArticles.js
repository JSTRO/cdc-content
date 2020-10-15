import { useEffect } from 'react'
import useAPI from './useAPI.js'

export default function useArticles() {
  const result = useAPI()

  useEffect(() => {
    result.setArticles([])
  }, [result.search])

  return result
}