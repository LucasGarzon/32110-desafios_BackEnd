let data = parseInt(process.argv.slice(2))

function getRandomInt(amount) {
  const enteredAmount = amount || 100000000
  for (let index = 0; index < enteredAmount ; index++) {
    Math.floor(Math.random() * 1000 + 1)
  }
  const result = {message: 'task completed', amount: enteredAmount}
  return process.send(result)
}

getRandomInt(data)







