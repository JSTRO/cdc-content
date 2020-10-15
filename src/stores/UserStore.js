import { extendObservable } from 'mobx'

class UserStore {
	constructor() {
		extendObservable(this, {
			loading: true,
			isLoggedIn: false,
			username: '',
			list: []
		})
	}
}

export default new UserStore()