const express = require('express');
const session = require('express-session');
const connectDB = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const path = require('path');

const app = express();

connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'tweet-secret',
  resave: false,
  saveUninitialized: false,
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', authRoutes);
app.use('/tweet', tweetRoutes);

// Start server

app.listen(1900, () => console.log("Server running on 1900"));
