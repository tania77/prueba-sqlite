var inquirer = require('inquirer');
var credential = require('credential'),
  pw = credential(),
  pass = 'chuchu';

pw.hash(pass, function (err, hash) {
  if (err) { throw err; }
  console.log('Store the password hash:\n', hash);
  var questions = [{ message: "Enter your password", type: 'password', name: 'password'}];
  inquirer.prompt(questions).then(function (userInput) {
    console.log(userInput);
    var userPass = userInput.password;
    console.log(userPass);
    pw.verify(hash, userPass, function (err, isValid) {
      var msg;
      if (err) { throw err; }
      msg = isValid ? 'Passwords match!' : 'Wrong password.';
      console.log(msg);
    });
  });
});