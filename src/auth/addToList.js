import axios from 'axios'
import UserStore from '../stores/UserStore'

export default async function addToList() {
  try {
    let res = await axios({
      url: '/list',
      method: 'post',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      data: JSON.stringify({
        username: UserStore.username,
        listID: listID
      })
    })
    
    let result = await res.data
    
    if (result && result.success) {
      UserStore.loading = false
      UserStore.list.push(result.listID)
    } else {
      UserStore.loading = false
    }
    
  } catch(err) {
      UserStore.loading = false
  }
}