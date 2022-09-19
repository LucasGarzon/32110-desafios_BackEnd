const express = require('express')
const {Server} = require('socket.io')
const Manager = require('./manager')


const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

const io = new Server(server)
const manager = new Manager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render("index", {
    products: manager.findAll()
  })
})

app.post('/', (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
  manager.create(req.body)
  res.redirect('/')
})

