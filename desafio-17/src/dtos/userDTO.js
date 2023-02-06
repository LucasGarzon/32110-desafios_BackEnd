export default class UserDTO { 
  constructor(user) {
    this._id = user._id
    this.full_name = `${user.first_name} ${user.last_name}`
    this.username = user.username
    this.password = user.password
    this.email = user.email
  }
}