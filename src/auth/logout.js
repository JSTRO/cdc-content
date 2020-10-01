import axios from 'axios'
import UserStore from '../stores/UserStore'

export default async function logOut() {
  try {
    let res = await axios({
      url: '/logOut',
      method: 'post',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      }
    })

    let result = await res.data
    
    if (result && result.success) {
      UserStore.isLoggedIn = false
      UserStore.username = ''
    } 
  } catch(err) {
      console.log(err)
  }
} 