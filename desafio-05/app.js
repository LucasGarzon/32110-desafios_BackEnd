const express = require('express')
const app = express()
const Manager = require('./manager')

const manager = new Manager()

const server = app.listen(8080, () => console.log('Server Up'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render("form")
})

app.post('/', (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
  manager.create(req.body)
  res.redirect('/')
})

app.get('/products', (req, res) => {
  res.render("get-products", {
    products: manager.findAll()
  })
})