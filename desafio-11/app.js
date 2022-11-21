import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import {Server} from 'socket.io'
import {productRouter} from './routes/productRouter.js'
import {chatRouter} from './routes/chat-router.js'
import ProductManager from './manager.js'
import ChatManager from './chatManager.js'
import loader from './daos/dataBaseLoader.js'
import User from './models/User.js'
import * as dotenv from 'dotenv' 
dotenv.config()

const uri = process.env.USER_URI

loader.start()

const productManager = new ProductManager()
const chatManager = new ChatManager()

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//IMPLEMENTACION DEL DESAFIO 10 --------------------------
app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: uri,
    collectionName: 'sessions',
    ttl: 120
  }),
  key: 'user_sid',
  secret: 'c0d3r',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))
//-------------------------------------------------------
app.use('/content', express.static('./public'))
app.set('views', './views')
app.set('view engine', 'ejs')

//IMPLEMENTACION DEL DESAFIO 10 --------------------------
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/dashboard')
  } else {
      next()
  }
}

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login')
})

app.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.render('index', {user: req.session.user.username})
  } else {
      res.redirect('/login')
  }
})

app.route('/login').get(sessionChecker, (req, res) => {
  res.render('index_login')
}).post((req, res) => {
  let user = new User({
      username: req.body.username,
  })
  user.save((err, docs) => {
      if (err) {
          res.redirect('/login')
      } else {
          req.session.user = docs
          res.redirect('/dashboard')
      }
  })
})

app.route('/logout').get((req, res) => {
  res.render('index_logout', {user: req.session.user.username})
}).delete((req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      req.session.destroy()
  }
  res.redirect('/login')
})
//-----------------------------------------------------------

app.use('/products', productRouter)
app.use('/chat', chatRouter)

io.on('connection', socket => {
  console.log(`Client ${socket.id} connected...`)
  productManager.findAll().then(result => socket.emit('history', result))
                          .catch(err => console.log(err))
  chatManager.findAll().then(result => socket.emit('chatHistory', result))
                       .catch(err => console.log(err))
  socket.on('products', data => {
      io.emit('history', data)
  })
  socket.on('chat', data => {
      io.emit('chatHistory', data)
  })
})