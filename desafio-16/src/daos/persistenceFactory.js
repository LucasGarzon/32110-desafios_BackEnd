import config from '../config.js'

export default class PersistenceFactory {
    static getPersistence = async () => {
        switch (config.app.persistence) {
            case "ARRAY":
                let { default: UsersDaoArray } = await import('./userDaoArray.js')
                return new UsersDaoArray()
            case "MONGO":
                let { default: UsersDaoMongo } = await import('./userDaoMongo.js')
                return new UsersDaoMongo()
        }
    }
}

// export class UserDaoFactory {
//     static getUserDao(): UserDao {
//       switch (process.env.DB) {
//         case "LOCAL":
//           return new LocalUserDao();
//         case "MONGO":
//           return new MongoUserDao();
//         default:
//           throw new Error("Invalid DB type");
//       }
//     }
//   }
  