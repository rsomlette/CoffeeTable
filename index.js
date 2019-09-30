const bodyParser = require('body-parser');
const express = require('express');
const exsession = require('express-session');
const app = express();
const port = 8080;
const userDao = require('./model/UserDAO.js');
const articleDao = require('./model/ArticleDAO.js');
const md = require('markdown-it')();

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
    success = await userDao.signUp(req.body.username, req.body.password, req.body.confirmPassword, req.body.forename, req.body.surname, req.body.email);
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
  let result = await userDao.signIn(req.body.username, req.body.password);
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
  let success = await userDao.deleteUser(req.body.username);
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

app.route('/write').get((req, res) => {
  res.render('write');
})

app.route('/403').get((req, res) => {
  res.render('403');
})

app.route('/submitPost').post(async (req, res) => {
  let success = await articleDao.saveArticle(req.body.title, req.body.markdown);
  let result = await md.render(req.body.markdown);
  res.send("<h1>" + req.body.title + "</h1>"  + md.render(req.body.markdown));
})

app.route('/test').get(async (req, res) => {
  res.sendFile('views/write.html' , { root : __dirname});
});
