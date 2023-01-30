import express from "express";
import passport from "passport";

const router = express.Router();

const logChecker = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

const outlineChecker = (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  res.redirect('/')
}

router.get("/", logChecker, loggerInfo, (req, res) => {
  res.render("index", { user: req.user.username });
});

router.get("/dashboard", logChecker, loggerInfo, (req, res) => {
  res.render("dashboard", { user: req.user.username });
});

router.get("/login", outlineChecker, loggerInfo, (req, res) => {
  res.render("login", { error: req.flash("error") });
});

router.get("/register", outlineChecker, loggerInfo, (req, res) => {
  res.render("register", { error: req.flash("error") });
});

router.post("/register", outlineChecker, async (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const user = new userModel({
    username,
    password: hash,
  });

  try {
    await user.save();
    req.login(user, (error) => {
      if (error) {
        return errorLogger.error(error);
      }
      res.redirect("/");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
});

router.post(
  "/login",
  outlineChecker,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export { userRouter };
