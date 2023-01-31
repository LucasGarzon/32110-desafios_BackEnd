import {chatSchema} from '../models/chatModel.js'

export default class ChatDaoMongo {

  create = async (message) => {
      try {
          await chatSchema.create(message)
          const chatTable = await chatSchema.find()
          return chatTable
      } catch(err) {
          console.log(err);
      }
  }

  getAllMessages = async () => {
      let chatTable = await chatSchema.find()
      return chatTable
  }
}