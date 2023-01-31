import config from '../config.js'

export default class PersistenceFactory {
    static getPersistence = async () => {
        switch (config.app.persistence) {
            case "FILE":
                let { default: UsersDaoFile } = await import('./userDaoFile.js')
                return new UsersDaoFile()
            case "MONGO":
                let { default: UsersDaoMongo } = await import('./userDaoMongo.js')
                return new UsersDaoMongo()
        }
    }
}

  