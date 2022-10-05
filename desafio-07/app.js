const express = require('express')
const {Server} = require('socket.io')
const productRouter = require('./routes/productRouter.js')
const chatRouter = require('./routes/chat-router.js')
const options = require('./options/mysql.config.js')
const knex = require('knex')

const database = knex(options)

const ProductManager = require('./manager')
const ChatManager = require('./chatManager')
const productManager = new ProductManager()
const chatManager = new ChatManager()

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/content', express.static('./public'))

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('index')
})

app.use('/products', productRouter)
app.use('/chat', chatRouter)

io.on('connection', socket => {
  console.log(`Client ${socket.id} connected...`)
  productManager.findAll().then(result => socket.emit('history', result))
                          .catch(err => console.log(err))
                          .finally(() => database.destroy())
  chatManager.findAll().then(result => socket.emit('chatHistory', result))
  socket.on('products', data => {
      io.emit('history', data)
  })
  socket.on('chat', data => {
      io.emit('chatHistory', data)
  })
})