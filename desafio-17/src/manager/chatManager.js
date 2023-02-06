import ChatService from "../services/chatService.js";
const ChatsService = new ChatService()

const saveMessage = async (req, res) => {
    const result = await ChatsService.addMessage(req.body)
    res.send(result)
}

const getMessages = async (rec, res) => {
    let result = await ChatsService.getChat()
    console.log(result);
    res.send(result)
}

const getMessagesForSocket = async (socket) => {
    let result = await ChatsService.getChat()
    socket.emit('chatHistory', result)
}

export default { 
    saveMessage, getMessages, getMessagesForSocket
}

