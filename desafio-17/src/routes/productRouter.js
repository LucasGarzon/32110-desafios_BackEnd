import {Router} from 'express';
import {loggerInfo} from '../app.js'
import manager from '../manager/manager.js'


const router = Router()

router.get('/', loggerInfo, manager.getAllProducts)
router.post('/', loggerInfo, manager.saveProduct)
router.delete('/:_id', manager.deleteProduct)

const productRouter = router
export {productRouter}