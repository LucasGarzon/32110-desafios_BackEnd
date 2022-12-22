import {Router} from 'express';
import Manager from '../chatManager.js'
import {loggerInfo} from '../app.js'
import errorLogger from '../app.js'

const router = Router()
const manager = new Manager()

router.get('/', loggerInfo, (req, res) => {
    manager.findAll()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.post('/', loggerInfo, (req, res) => {
    if (!req.body.email || !req.body.message) {
        // -- DESAFIO 14 || LOG4JS -- Errores lanzados por las apis de mensajes y productos, únicamente (error)
        errorLogger.error('data is required')
        return res.send({error: 'data is required'})  
    } 
    manager.create(req.body)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

const chatRouter = router
export {chatRouter}
