import {Router} from 'express';
import manager from '../manager/chatManager.js'
import {loggerInfo} from '../app.js'

const router = Router()

router.get('/', loggerInfo, manager.getMessages)
router.post('/', loggerInfo, manager.saveMessage)

const chatRouter = router
export {chatRouter}
