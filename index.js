const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8080;
const uc = require('./controllers/usercontroller.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index')
});

app.route('/signup').post(function(req,res){
  var date = new Date();
  console.log("Sign is: " + uc.signup(req.body.username, req.body.password, req.body.conf_password, req.body.forename, req.body.surname, req.body.email));
  res.send("completed");
});

app.route('/signin').post(function(req,res){
  var date = new Date();
  console.log("Sign in at " + date);
  res.send('<p>This will sign you in</p>');
});

app.listen(port, function(){
  console.log("App listening on " + port);
});
