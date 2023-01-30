import config from '../config.js'

export default class PersistenceFactory {
    static getPersistence = async () => {
        switch (config.app.persistence) {
            case "ARRAY":
                let { default: UsersDaoArray } = await import('./userDaoArray.js')
            //     return new UsersDaoArray()
            // case "DB":
            //     let { default: UsersDaoDB } = await import('./userDaoDB.js')
            //     return new UsersDaoDB()
        }
    }
}