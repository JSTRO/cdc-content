import { useState } from 'react'

export default function useMyList() {
  const [myList, setMyList] = useState([])

  console.log(myList)

  return { myList, setMyList }
}