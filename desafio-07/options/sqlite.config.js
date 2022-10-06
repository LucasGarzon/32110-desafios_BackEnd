const options = {
  client: 'sqlite3',
  connection: {
    filename: './db/chat-sqlite3.sqlite'
  },
  useNullAsDefault: true
}

module.exports = options