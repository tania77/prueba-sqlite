"use strict";


var express = require('express');
var app = express();
var  expressLayouts = require('express-ejs-layouts');

var passport = require('passport');
var Strategy = require('passport-github').Strategy;



passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:/login/github/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's GitHub profile is supplied as the user
    // record.  In a production-quality application, the GitHub profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));
  
app.use(passport.initialize());
app.use(passport.session());


app.set('port', (process.env.PORT || 8080));


app.use(expressLayouts);

app.use(express.static('gh-pages'));


//routes

app.get('/login',function(req, res){
    res.send('login');
});

app.get('/login/github',passport.authenticate('github'));

app.get('/login/github/return', passport.authenticate('github', { failureRedirect: '/login' }),function(req, res) {
    res.redirect('/');
});

app.get('/profile',require('connect-ensure-login').ensureLoggedIn(),function(req, res){
    res.render('profile', { user: req.user });
});


app.get('/', function(request, response){
  response.send('index',{ user: request.user });  
});



app.listen(app.get('port'), function() {
  console.log('Node app ejecutandose en el puerto', app.get('port'));
});

module.exports = app;






