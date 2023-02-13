import connectDB from './mongoDB.js'

class Loaders {
  start() {
    connectDB()
  }
}

const loader = new Loaders()
export default loader