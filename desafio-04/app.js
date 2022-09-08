const express = require('express')
const productRouter = require('./routes/products')
const app = express()

const server = app.listen(8080, () => console.log('Server Up'))

app.use(express.json())
app.use('/', express.static('public'))
app.use('/api/productos', productRouter)