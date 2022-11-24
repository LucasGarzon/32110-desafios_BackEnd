export default function getRandomInt(amount) {
  const enteredAmount = amount || 100000000
  for (let index = 0; index < enteredAmount ; index++) {
    Math.floor(Math.random() * 1000 + 1)
  }
  return {message: 'task completed'}
}







