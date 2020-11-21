import { extendObservable, runInAction } from 'mobx'
import axios from 'axios'

class UserStore {
	constructor() {
		extendObservable(this, {
			loading: true,
			isLoggedIn: false,
			username: '',
			list: []
		})
	}

  checkIsLoggedIn = async () => {
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
        runInAction(() => {
          this.loading = false
          this.isLoggedIn = true
          this.username = result.username
          this.getListItems()
        })  
      } else {
        runInAction(() => {
          this.loading = false
          this.isLoggedIn = false
        })
      }
      
    } catch(err) {
      runInAction(() => {
        this.loading = false
        this.isLoggedIn = false
      })
    }
  }

  logout = async () => {
    try {
      let res = await axios({
        url: '/logout',
        method: 'post',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        }
      })

      let result = await res.data
      
      if (result && result.success) {
        runInAction(() => {
          this.isLoggedIn = false
          this.username = ''
        }) 
      } 
    } catch(err) {
      runInAction(() => {
        console.log(err)
      })  
    }
  } 

	getListItems = async () => { 
    try {
      let res = await axios({
        url: '/list',
        method: 'get',
        params: {
          username: this.username
        }
      })

      let result = await res.data

      if (result && result.success) {
      	runInAction(() => {
        	this.loading = false
        	this.list = result.data
      	})
      } else {
      	runInAction(() => {
        	this.loading = false
        })
      }
    } catch (err) {
    	runInAction(() => {
	      this.loading = false
    	})
    }
  }

  isItemInList = (id) => {
    return this.list.some(item => item.listID === id)
  }

  addToList = async (listID, name, sourceUrl) => {
    try {
      let res = await axios({
        url: '/list',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          username: this.username,
          listID: listID,
          name: name,
          sourceUrl: sourceUrl
        }),
      })

      let result = await res.data

      if (result && result.success) {
        if (this.isItemInList) {
          runInAction(() => {
            this.loading = false
          })
        }
        runInAction(() => {
          this.loading = false
          this.list.push(result)
        })
      } else {
        runInAction(() => {
          this.loading = false
        })
      }
    } catch (err) {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  deleteListItem = async (id) => { 
    try {
      let res = await axios({
        url: '/list',
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: {
          username: this.username,
          listID: id
        }
      })

      let result = await res.data

      if (result && result.success) {
        runInAction(() => {
          this.loading = false
          this.list = this.list.filter(item => item.listID !== id)
        })
      } else {
        runInAction(() => {
          this.loading = false
        })
      }
    } catch (err) {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}

export default new UserStore()