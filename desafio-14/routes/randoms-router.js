// import getRandomInt from "../apis/randoms.js";
import { Router } from "express";
import { fork } from 'child_process'
import {loggerInfo} from '../app.js'

const router = new Router 

router.get('/', loggerInfo, (req, res) => {
  const userAmount = parseInt(req.query.cant)
  let taskCompleted = fork('./apis/randoms', [userAmount])
  taskCompleted.on('message', msg => {
    return res.render('index_random', {message: msg.message, amount: msg.amount})
  })
})

const randomRouter = router
export {randomRouter}

