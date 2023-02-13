import UserModel from './models/userModel.js'

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const users = await UserModel.find()
      return users 
    },
    getUserById: async (parent, args, context, info) => {
      const { id } = args
      const user = await UserModel.findById(id)
      return user
    }
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { username, email, password} = args
      const newUser = new UserModel({ username, email, password})
      await newUser.save()
      return newUser
    },
    deleteUser: async (parent, args, context, info) => {
      const { id } = args
      const user = await UserModel.findByIdAndDelete(id)
      return user
    },
    updateUser: async (parent, args, context, info) => {
      const { id, username, email, password } = args
      const user = await UserModel.findById(id)
      if (!user) {
        throw new Error(`El usuario con id ${id} no ha sido encontrado`)
      }
      if (username) {
        user.username = username
      }
      if (email) {
        user.email = email
      }
      if (password) {
        user.password = password
      }
      await user.save()
      return user
    }
  }
}

export default resolvers