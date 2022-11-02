import express from 'express'
import {Server} from 'socket.io'
import {productRouter} from './routes/productRouter.js'
import {chatRouter} from './routes/chat-router.js'
import options from './options/mysql.config.js'
import optionsChat from './options/sqlite.config.js'
import knex from 'knex'
import ProductManager from './manager.js'
import ChatManager from './chatManager.js'
import randomProducts from './fakerManager.js'


const database = knex(options)
const databaseChat = knex(optionsChat)
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
//View de Faker
app.get('/api/productos-test', (req, res) => {
  res.render('indexFaker', {randomProducts})
})

app.use('/products', productRouter)
app.use('/chat', chatRouter)


io.on('connection', socket => {
  console.log(`Client ${socket.id} connected...`)
  productManager.findAll().then(result => socket.emit('history', result))
                          .catch(err => console.log(err))
                          .finally(() => database.destroy())
  chatManager.findAll().then(result => socket.emit('chatHistory', result))
                       .catch(err => console.log(err))
                       .finally(() => databaseChat.destroy())
  socket.on('products', data => {
      io.emit('history', data)
  })
  socket.on('chat', data => {
      io.emit('chatHistory', data)
  })
})