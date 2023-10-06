const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));


//////////////
const cors = require('cors');
app.use(cors());
//////////////

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const store = new mongoDbStore({
  //uri:'mongodb+srv://abdalrmanbadwy:W7qp1OI3fl2kktYc@cluster0.z40ugzh.mongodb.net/shop?retryWrites=true&w=majority',
  // uri:'mongodb+srv://dstr1:1357902468@mmagdydb.otulj0s.mongodb.net/ecommerce',
  // collection: 'sessions'
  uri:'mongodb+srv://stevenbahaa:Silver29z@cluster0.ytmnzlw.mongodb.net/Project',
  collection: 'sessions'
  // uri:'mongodb+srv://omar:01omar27@cluster0.xaqvvlx.mongodb.net/Store',
  // collection: 'sessions'

});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    store: store
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use('/shop',shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://stevenbahaa:Silver29z@cluster0.ytmnzlw.mongodb.net/Project'
    )
  .then(result => {
    console.log("DataBase Connected!");
  })
  .catch(err => {
    console.log("DataBase NOT Connected!");
    console.log(err);
  });

  app.listen(3002, function () {
    console.log("server connected");
  });