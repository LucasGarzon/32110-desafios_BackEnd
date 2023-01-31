import config from '../config.js'

export default class PersistenceFactory {
    static getPersistence = async () => {
        switch (config.app.persistence) {
            case "FILE":
                let { default: UsersDaoFile } = await import('./userDaoFile.js')
                return new UsersDaoFile()
            case "MONGO":
                let { default: UsersDaoMongo } = await import('./userDaoMongo.js')
                let { default: ProductDaoMongo } = await import('./productDaoMongo.js')
                let response = { users: new UsersDaoMongo(), products: new ProductDaoMongo() }
                return response
        }
    }
}

  