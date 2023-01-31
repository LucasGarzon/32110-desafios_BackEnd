import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import UsersService from "../services/userService.js";
const userService = new UsersService()

const authenticate = (userService) => {
  return (username, password, done) => {
    userService.getUser(username)
      .then((user) => {
        if (!user) return done(null, false, { message: 'Nombre de usuario no válido' })
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) return done(err)
          if (res === false) return done(null, false, { message: 'Contraseña inválida' })
          return done(null, user)
        })
      })
      .catch((err) => done(err))
  }
}

passport.use(new LocalStrategy(authenticate(userService)))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  userService.getUserById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err))
})