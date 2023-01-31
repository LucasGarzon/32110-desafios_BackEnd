import __dirname from "../utils.js";
import fs from 'fs'
import bcrypt from 'bcryptjs'

export default class UsersDaoFile {
  
  constructor() {
    this.path = __dirname + '/files/users.json'
    this.#init()
  } 
  
  #init = async () => {
    if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
  }
  
  #readFile = async() => {
    let data = await fs.promises.readFile(this.path, 'utf-8')
    return JSON.parse(data)
  }  

  create = async (user) => {
    try {
      const { username, email, password, first_name, last_name } = user
      let users = await this.#readFile()
      const foundUsername = users.find(u => u.username === username)
      const foundEmail = users.find(u => u.email === email)
      if (foundUsername || foundEmail) return false
      let userId = 0
      if (users.length === 0) userId = 1
      else userId = users[users.length-1].id + 1
      const cryptPass = await bcrypt.hash(password, 12)
      const newUser = {
        username,
        email,
        first_name,
        last_name,
        password: cryptPass,
        createdAt: new Date().toUTCString(),
        id: userId
      }
      users.push(newUser)
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))
      return true
    } catch (err) {
      console.log(err)
    }
  }

  findOne = async(username) => {
    let users = await this.#readFile()
    const foundUser = users.find(u => u.username === username)
    if (!foundUser) return null
    return foundUser
  }

  findById = async (id) => {
    let users = await this.#readFile()
    const foundUser = users.find(u => u.id === id)
    if (!foundUser) return null
    return foundUser
  }

}