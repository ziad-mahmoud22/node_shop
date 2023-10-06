const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

// exports.getLogin = (req, res, next) => {
//   //const user = req.user;
//   const loggedIn = req.session.isLoggedIn;
//   res.send({
//     //user: user,
//     isAuthenticated: loggedIn,
//   });
// }

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        //return res.redirect("/login");
        res.send({
          //user: user,
          isAuthenticated: false,
          word: "E-mail not found.",
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;

            return req.session.save((err) => {
              console.log(err);
              //res.redirect("/");
              const s = req.session;
              res.send({
                session: s,
                isAuthenticated: true,
                word: "Loggedin!!",
                route: "/"
              });
            });
          }
          //res.redirect("/login");
          res.send({
            //user: user,
            isAuthenticated: false,
            word: "Wrong Password"
          });
        })
        .catch((err) => {
          // console.log(err);
          // res.redirect("/login");
          res.send({
            //user: user,
            isAuthenticated: false,
            message: err
          });
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        // return res.redirect("/signup");
        res.send({
          isAuthenticated: false,
          word: "E-mail exists!!",
          route: "/register"
        });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          // res.redirect("/login");
          res.send({
            isAuthenticated: false,
            word: "User Created!!",
            route: "/login"
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
