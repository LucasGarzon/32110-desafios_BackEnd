export default class UsersDaoArray {
  
  constructot() {
    this.users = []
  }

  getAll = async () => {
    return this.users
  }

  save = async (user) => {
    if (this.user.length === 0) user.id = 1
    else user.id = this.user[this.users.lenght-1].id + 1
    this.user.push(user)
  }
}