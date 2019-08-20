const bodyParser = require('body-parser');
const express = require('express');
const exsession = require('express-session');
const app = express();
const port = 8080;
const dao = require('./model/UserDAO.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(exsession({
  secret:"coffee table secret!",

}));

app.set('view engine', 'jade');

app.listen(port, function(){
  console.log("App listening on " + port);
});

app.get('/', function(req, res){
  session = req.session;
  session.role;
  res.render('index')
});

app.route('/signup').post( async function(req,res){
  let date = new Date();
  let success = null;
  try{
    success = await dao.signUp(req.body.username, req.body.password, req.body.confirmPassword, req.body.forename, req.body.surname, req.body.email);
  }
  catch{
    success = false;
  }
  responseJSON = {
    "status":100,
    "message": "",
  };
  if(success.status == true){
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
  let result = await dao.signIn(req.body.username, req.body.password);
  responseJSON = {
    "status":100,
    "message": "",
  };
  let session = req.session;
  if(result.status == true){
    session.username = result.username;
    session.role = result.role;
    responseJSON.status = 200;
    responseJSON.message = "Signing you in!\n Welcome " + session.username + ". You are signing in as a " + session.role;
    res.redirect('/admin');
    //res.status(responseJSON.status).json(responseJSON);
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
  responseJSON = {
    "status":100,
    "message": "",
  };
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
  if(req.session.role == 'admin'){
    res.render('admin')
  }
  else{
    res.redirect('/403')
  }
});

app.route('/403').get((req, res) => {
  res.render('403');
})

app.route('/test').get(async (req, res) => {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});
