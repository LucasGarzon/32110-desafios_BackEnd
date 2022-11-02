import {chatSchema} from './models/chatModel.js'

export default class ChatManager {
    create = async (message) => {
        try {
            await chatSchema.create(message)
            let chatTable = this.findAll()
            return chatTable
        } catch(err) {
            return {status: "error", message: err.message}
        }
    }

    findAll = async () => {
        let chatTable = await chatSchema.find()
        return chatTable
    }
}

