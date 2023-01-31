import PersistenceFactory from "../daos/persistenceFactory.js";

export default class ChatService { 
  constructor() {
    this.chatDao
    this.init()
  }

  init = async() => {
    let persistence = await PersistenceFactory.getPersistence()
    this.chatDao = persistence.chats
  }

  getChat = async() => {
    return await this.chatDao.getAllMessages()
  }
  
  addMessage = async(newMessage) => {
    const { email, message } = newMessage
    if (!email || !message) return null
    return await this.chatDao.create(newMessage)
  }

}