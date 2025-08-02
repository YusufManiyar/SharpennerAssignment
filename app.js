const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user.js'); // Assuming you have a User model

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const user = require('./models/user.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("688ddac2936c944466286f80")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://GenerateImageData:GenerateImageData@cluster0.2qhjuyk.mongodb.net/sharpenertask?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    user.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            username: 'Yusuf',
            email: 'yusuf@gmail.com',
          });
          user.save();
        }
      });
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

