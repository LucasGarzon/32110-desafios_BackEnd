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
// -- DESAFIO 14 || COMPRESSION -- 
import compression from 'compression'
// -- DESAFIO 14 || LOG4JS -- 
import log4js from 'log4js'
dotenv.config()

const uri = process.env.USER_URI

loader.start()

const productManager = new ProductManager()
const chatManager = new ChatManager()

const app = express()
const PORT = parseInt(process.argv.slice(2)) || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// -- DESAFIO 14 || COMPRESSION -- 
app.use(compression({
  level: 6
}))
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

// -- DESAFIO 14 || LOG4JS -- CONFIGURACIÓN 
log4js.configure({
  appenders: {
    console: { type: 'console' },
    warn: { type: 'file', filename: 'warn.log' },
    error: { type: 'file', filename: 'error.log' },
  },
  categories: {
    default: { appenders: ['console'], level: 'all' },
    warn: { appenders: ['console', 'warn'], level: 'warn' },
    error: { appenders: ['console', 'error'], level: 'error' },
  },
});

// -- DESAFIO 14 || LOG4JS -- SEPARAR EN CATEGORÍAS
const logger = log4js.getLogger();
const warnLogger = log4js.getLogger('warn');
const errorLogger = log4js.getLogger('error');
export default errorLogger

// -- DESAFIO 14 || LOG4JS -- Ruta y método de todas las peticiones recibidas por el servidor (info)
export function loggerInfo (req, res, next) {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info(`${req.method} ${fullUrl}`)
  next()
}

const logChecker = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

const outlineChecker = (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  res.redirect('/')
}

app.get('/', logChecker, loggerInfo, (req, res) => {
  res.render('index', {user: req.user.username})
})

app.get('/dashboard', logChecker, loggerInfo, (req, res) => {
    logger.info(`${req.method} ${req.url}`)
    res.render('index', {user: req.user.username})
})

app.get('/singup', loggerInfo, (req, res) => {
  res.render('index_singup')
})

app.get('/registerError', loggerInfo, (req, res) => {
  res.render('register_error')
})

app.get('/loginError', loggerInfo, (req, res) => {
  res.render('login_error')
})

app.post('/singup', loggerInfo, async (req, res) => {
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

app.get('/login', outlineChecker, loggerInfo, (req, res) => {  
  res.render('index_login');
})

app.post('/login', loggerInfo, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/loginError'
}))

app.get('/logout', loggerInfo, function (req, res, next) {
  const username = req.user.username
	req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.render('index_logout', {user: username})
  })
})

// -- DESAFIO 14 || LOG4JS -- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
app.use((req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  warnLogger.warn(`method ${req.method} and route ${fullUrl} not implemented`)
  res.status(404).send('<h1>Page not found on the server</h1>')
});

//-----------------------------------------------------------

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

