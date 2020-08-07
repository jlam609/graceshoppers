const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrpyt = require("bcrypt");
const {
  models: {User},
} = require("../db");

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({
      where: {
        username,
      },
    })
      .then(function (user) {
        const hashPassword = bcrpyt.hashSync(password, user.salt);
        if (!user) {
          return done(null, false, {
            message: "Username does not exist",
          });
        }
        if (user.password !== hashPassword) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        const userinfo = user.get();
        return done(null, userinfo);
      })
      .catch(function (err) {
        console.log("Error:", err);

        return done(null, false, {
          message: "Something went wrong with your Signin",
        });
      });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(
    () =>
      function (err, user) {
        done(err, user);
      }
  );
});
