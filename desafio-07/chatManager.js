
const options = require('./options/sqlite.config.js')
const knex = require('knex')

const database = knex(options)

class ChatManager {
    create = async (message) => {
        try {
            let existTable = await database.schema.hasTable('messages')
            if (existTable) {
            message = {
                email: message.email,
                timestamp: new Date().toLocaleString(),
                message: message.message               
            }
            await database('messages').insert(message)
            let results = JSON.parse(JSON.stringify(await database.from('messages').select('*'))) 
            return results
            } else {
                await database.schema.createTable('messages', table => {
                    table.increments('id')
                    table.string('email', 64).nullable(false)
                    table.string('timestamp', 32).nullable(false)
                    table.string('message', 256).nullable(false)
                })
                message = {
                    email: message.email,
                    timestamp: new Date().toLocaleString(),
                    message: message.message               
                }
                await database('messages').insert(message)
                let results = JSON.parse(JSON.stringify(await database.from('messages').select('*'))) 
                // database.destroy()
                return results 
            }
        } catch(err) {
            return {status: "error", message: err.message}
        }
    }

    findAll = async () => {
        let chat = []
        let existTable = await database.schema.hasTable('messages')
        if (existTable) {
            chat = JSON.parse(JSON.stringify(await database.from('messages').select('*'))) 
        }
        return chat
        // database.destroy()
    }
}

module.exports = ChatManager