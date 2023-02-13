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
    }
  }
}

export default resolvers