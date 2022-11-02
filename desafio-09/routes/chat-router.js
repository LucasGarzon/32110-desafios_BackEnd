import {Router} from 'express';
import Manager from '../chatManager.js'

const router = Router()
const manager = new Manager()

router.get('/', (req, res) => {
    manager.findAll()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    if (!req.body.email || !req.body.message) return res.send({error: 'data is required'})
    manager.create(req.body)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

const chatRouter = router
export {chatRouter}
