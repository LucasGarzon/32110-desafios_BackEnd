const Manager = require('../chatManager.js')
const manager = new Manager()

let chat = manager.findAll()

module.exports = chat