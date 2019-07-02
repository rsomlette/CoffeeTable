const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8080;
const dao = require('./model/UserDAO.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index')
});

app.route('/signup').post( async function(req,res){
  let date = new Date();
  let success = await dao.signUp(req.body.username, req.body.password, req.body.confirmPassword, req.body.forename, req.body.surname, req.body.email);
  console.log("Success is: " + success);
  if(success == true){
    res.send("completed with success!");
  }
  else{
    res.send("completed with failure!");
  }
});

app.route('/delete').get(async function(req,res){
  //Currently only used for testing!
  let date = new Date();
  let success = await dao.deleteUser("test");
  console.log("Success is: " + success);
  if(success == 1){
    res.send("deleted with success!");
  }
  else{
    res.send("deleted with failure!");
  }
});

app.route('/signin').post(function(req,res){
  let date = new Date();
  console.log("Sign in at " + date);
  res.send('<p>This will sign you in</p>');
});

app.listen(port, function(){
  console.log("App listening on " + port);
});
