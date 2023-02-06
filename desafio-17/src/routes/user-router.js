import express from "express";
import passport from "passport";
import { loggerInfo } from "../app.js";
import userManager from "../manager/userManager.js";

const router = express.Router();

const logChecker = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

const outlineChecker = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};

router.get("/", logChecker, loggerInfo, (req, res) => {
  res.render("index", { user: req.user.full_name });
});

router.get("/dashboard", logChecker, loggerInfo, (req, res) => {
  res.render("index", { user: req.user.full_name });
});

router.get("/singup", outlineChecker, loggerInfo, (req, res) => {
  res.render("index_singup");
});

router.get("/login", outlineChecker, loggerInfo, (req, res) => {
  res.render("index_login");
});

router.get('/loginError', loggerInfo, (req, res) => {
  res.render('login_error')
})

router.post('/singup', loggerInfo, userManager.saveUser)

router.get('/registerError', loggerInfo, (req, res) => {
  res.render('register_error')
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/loginError",
  })
);

router.get('/logout', loggerInfo, function (req, res, next) {
  const username = req.user.full_name
	req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.render('index_logout', {user: username})
  })
})


const userRouter = router;
export { userRouter };
