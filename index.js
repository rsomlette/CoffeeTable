const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8080;
const dao = require('./model/UserDAO.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.listen(port, function(){
  console.log("App listening on " + port);
});

app.get('/', function(req, res){
  res.render('index')
});

app.route('/signup').post( async function(req,res){
  let date = new Date();
  let success = await dao.signUp(req.body.username, req.body.password, req.body.confirmPassword, req.body.forename, req.body.surname, req.body.email);
  console.log("Success is: " + success);
  responseJSON = {
    "status":100,
    "message": "",
  };
  if(success == true){
    responseJSON.status = 200;
    responseJSON.message = "Account Created!\nSigning You In.";
    res.status(responseJSON.status).json(responseJSON);
  }
  else{
    responseJSON.status = 403;
    responseJSON.message = "Error Creating Account!\nAccount may already exist or form inputs do not follow the required pattern."
    res.status(responseJSON.status).json(responseJSON);
  }
});

app.route('/signin').post(async function(req,res){
  let date = new Date();
  console.log("Sign in at " + date);
  let success = await dao.signIn(req.body.username, req.body.password);
  console.log("Success is: " + success);
  responseJSON = {
    "status":100,
    "message": "",
  };
  if(success == true){
    responseJSON.status = 200;
    responseJSON.message = "Signing you in!";
    res.status(responseJSON.status).json(responseJSON);
  }
  else{
    responseJSON.status = 403;
    responseJSON.message = "Invalid login credentials";
    res.status(responseJSON.status).json(responseJSON);
  }
});

app.route('/delete').get(async function(req,res){
  //Currently only used for testing!
  let date = new Date();
  let success = await dao.deleteUser(req.body.username);
  console.log("Success is: " + success);
  if(success == 1){
    responseJSON.status = 200;
    responseJSON.message = "User deleted!";
    res.status(responseJSON.status).json(responseJSON);
  }
  else{
    responseJSON.status = 400;
    responseJSON.message = "User not deleted!";
    res.status(responseJSON.status).json(responseJSON);
  }
});

app.route('/admin').get( (req, res) => {
  res.render('admin');
});
