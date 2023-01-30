import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import userModel from "../models/User.js"

passport.use(new LocalStrategy(function (username, password, done) {
  userModel.findOne({username: username}, function (err, user) {
    if (err) return done(err)
    if (!user) return done(null, false, {message: 'Nombre de usuario no válido'})

    bcrypt.compare(password, user.password, function (err, res) {
      if (err) return done(err)
      if (res === false) return done(null, false, {message: 'Contraseña inválida'})
      return done(null, user)
    })
  })
}))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  userModel.findById(id, function(err, user) {
    done(err, user)
  })
})