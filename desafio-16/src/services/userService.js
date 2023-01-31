import PersistenceFactory from "../daos/persistenceFactory.js";

export default class UsersService { 
  constructor() {
    this.usersDao
    this.init()
  }

  init = async() => {
    this.usersDao = await PersistenceFactory.getPersistence()
  }

  addUser = async(user) => {
    return await this.usersDao.create(user)
  }
}