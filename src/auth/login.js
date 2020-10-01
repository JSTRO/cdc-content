import axios from 'axios'
import UserStore from '../stores/UserStore'

export default async function login() {
  try {
    let res = await axios({
      url: '/isLoggedIn',
      method: 'post',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      }
    })
    
    let result = await res.data
    
    if (result && result.success) {
      UserStore.loading = false
      UserStore.isLoggedIn = true
      UserStore.username = result.username
    } else {
      UserStore.loading = false
      UserStore.isLoggedIn = false
    }
    
  } catch(err) {
      UserStore.loading = false
      UserStore.isLoggedIn = false
  }
}