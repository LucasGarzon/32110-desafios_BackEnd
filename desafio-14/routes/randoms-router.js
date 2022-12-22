// import getRandomInt from "../apis/randoms.js";
import { Router } from "express";
import {loggerInfo} from '../app.js'
import {getRandomInt} from '../apis/randoms.js'

const router = new Router 

router.get('/', loggerInfo, (req, res) => {
  const userAmount = parseInt(req.query.cant)
  let taskCompleted = getRandomInt(userAmount)
  return res.render('index_random', {message: taskCompleted.message, amount: taskCompleted.amount})
})

const randomRouter = router
export {randomRouter}

