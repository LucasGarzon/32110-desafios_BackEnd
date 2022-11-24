import getRandomInt from "../apis/randoms.js";
import { Router } from "express";

const router = new Router 

router.get('/', (req, res) => {
  const userAmount = req.query.cant || 'A default value was used'
  const taskCompleted = getRandomInt(userAmount)
  res.render('index_random', {message: taskCompleted.message, amount: userAmount})
})

const randomRouter = router
export {randomRouter}