import __dirname from "../utils.js";
import fs from 'fs'


export default class ChatDaoFile {

  constructor() {
    this.path = __dirname + '/files/messages.json'
    this.#init()
  }

  #init = async () => {
    if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
  }

  #readFile = async () => {
    let data = await fs.promises.readFile(this.path, 'utf-8')
    return JSON.parse(data)
  }

  create = async (newMessage) => {
    try {
      let messages = await this.#readFile()
      if (messages.length === 0) newMessage._id = 1
      else newMessage._id = messages[messages.length-1]._id + 1
      newMessage.timestamp = new Date().toUTCString()
      messages.push(newMessage)
      await fs.promises.writeFile(this.path, JSON.stringify(messages, null, 2))
      return messages
    } catch (err) {
      console.log(err)
    }
  }

  getAllMessages = async () => {
    const messages = await this.#readFile()
    return messages
  }

}

