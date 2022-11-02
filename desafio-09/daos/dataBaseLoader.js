import startDB from './loaderMongo.js'

class Loaders {
  start() {
    startDB()
  }
}

const loader = new Loaders()
export default loader