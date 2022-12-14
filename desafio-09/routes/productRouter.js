import {Router} from 'express';
import Manager from '../manager.js'


const router = Router()
const manager = new Manager

router.get('/', (req, res) => {
    manager.findAll()
     .then(result => res.send(result))
     .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
  manager.create(req.body)
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

const productRouter = router
export {productRouter}