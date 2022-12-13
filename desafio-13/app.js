import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import {Server} from 'socket.io'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import {productRouter} from './routes/productRouter.js'
import {chatRouter} from './routes/chat-router.js'
import { infoRouter } from './routes/info-router.js'
import ProductManager from './manager.js'
import ChatManager from './chatManager.js'
import loader from './daos/dataBaseLoader.js'
import * as dotenv from 'dotenv' 
import userModel from './models/User.js'
import './strategies/local.js'
import { randomRouter } from './routes/randoms-router.js'
import cluster from 'cluster'
import core from 'os'
import { fork } from 'child_process'
dotenv.config()

const uri = process.env.USER_URI
loader.start()
const productManager = new ProductManager()
const chatManager = new ChatManager()
const app = express()
const PORT = parseInt(process.argv[2]) || 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/content', express.static('./public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: uri,
    collectionName: 'sessions',
    ttl: 120
  }),
  key: process.env.USER_KEY,
  secret: 'c0d3r',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}))
app.use(passport.initialize());
app.use(passport.session());

// ####--------- DESAFIO 13 ----------####

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid}`)
  for (let i=0; i<core.cpus().length; i++) {
    cluster.fork()
  }
  cluster.on('exit', () => cluster.fork())
} else {
  const server = app.listen(PORT, () => console.log(`Server up on port ${PORT} by process ${process.pid}`))
  const io = new Server(server)

  const logChecker = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
  }
  const outlineChecker = (req, res, next) => {
    if (!req.isAuthenticated()) return next()
    res.redirect('/')
  }
  app.get('/', logChecker, (req, res) => {
    res.render('index', {user: req.user.username})
  })
  app.get('/dashboard', logChecker, (req, res) => {
      res.render('index', {user: req.user.username})
  })
  app.get('/singup', (req, res) => {
    res.render('index_singup')
  })
  app.get('/registerError', (req, res) => {
    res.render('register_error')
  })
  app.get('/loginError', (req, res) => {
    res.render('login_error')
  })
  app.post('/singup', async (req, res) => {
    const {username, email, password} = req.body
    try {
      let user = await userModel.findOne({username})
      if(user) res.redirect('/registerError')
      const cryptPass = await bcrypt.hash(password, 12)
      user = await userModel.create({
        username,
        email,
        password: cryptPass
      })
      res.redirect('/')
    } catch (err) {
      console.log(err);
    }
  })
  app.get('/login', outlineChecker, (req, res) => {  
    res.render('index_login');
  })
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/loginError'
  }))
  app.get('/logout', function (req, res, next) {
    const username = req.user.username
    req.logout(function(err) {
      if (err) { 
        return next(err); 
      }
      res.render('index_logout', {user: username})
    })
  })
 
  app.use('/info', infoRouter)
  app.use('/api/random', randomRouter)
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
}

