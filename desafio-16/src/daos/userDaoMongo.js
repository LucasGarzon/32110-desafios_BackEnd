import userModel from '../models/User.js'
import bcrypt from 'bcryptjs'

export default class userDaoMongo { 
  
  create = async (user) => {
    try {
      const { username, email, password, first_name, last_name } = user
      let newUser = await userModel.findOne({ $or: [{username: username}, {email: email}] })
      if (newUser) return false
      const cryptPass = await bcrypt.hash(password, 12)
      newUser = await userModel.create({
        username, 
        email,
        password: cryptPass,
        first_name,
        last_name
      })
      return true
    } catch (err) {
      console.log(err)
    }
  }

  findOne = async (username) => {
    const foundUser = await userModel.findOne({username: username})
    if (!foundUser) return null
    return foundUser
  }

  findById = async (id) => {
    const foundUser = await userModel.findOne({_id: id})
    if (!foundUser) return null
    return foundUser
  }

}



