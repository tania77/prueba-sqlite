"use strict";


var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var Strategy = require('passport-github').Strategy;


passport.use(new Strategy({
    clientID: '217bf6cd072238e4f2d1',
    clientSecret: '3aac244b495a7fda4e113c46d8db90eeec137201',
    callbackURL: 'http://localhost:8080/login/github/return'
},function(accessToken, refreshToken, profile, cb) {
    var github = require('octonode');
    var client = github.client(accessToken);
    var ghme           = client.me();
    var ghuser         = client.user('crguezl');
    var ghrepo         = client.repo('crguezl/ull-esit-1617');
    var ghorg          = client.org('ULL-ESIT-SYTW-1617');
    console.log("CAMBIOSOOSOSOSOSOSO");
    ghorg.members(function(err,stdout){
      console.log(stdout);
      if(err) console.log(err);
        for (var i in stdout){
          if(stdout[i].login == profile.name){
            console.log(stdout[i].login);
          }
        }      
    });
    return cb(null, profile);
  }));
  

// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});




app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'gh-pages')));

app.set('port', (process.env.PORT || 8080));

app.set('view engine', 'ejs');



app.use(passport.initialize());
app.use(passport.session());

//routes


app.get('/', function(req, res){
    
  res.render('home',{user: req.user}); 
    
});

app.get('/book',function(req, res) {
  res.sendfile('gh-pages/juanito.html');
  
});

app.get('/home',function(req, res) {
   res.render('home',{user: req.user}); 
});

app.get('/login',function(req, res){

  app.get('/profile',function(req, res) {
     res.render('home'); 
  });

    res.render('login');
});

app.get('/login/github',passport.authenticate('github'));

app.get('/login/github/return', passport.authenticate('github', { failureRedirect: '/login' }),function(req, res) {
    res.redirect('/');
});

app.get('/profile',require('connect-ensure-login').ensureLoggedIn(),function(req, res,next){
  res.render('profile',{user: req.user});
});




app.listen(app.get('port'), function() {
  console.log('Node app ejecutandose en el puerto', app.get('port'));
});

module.exports = app;






