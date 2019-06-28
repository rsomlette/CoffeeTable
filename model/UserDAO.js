const mysql = require('mysql');
var validator = require("email-validator");

module.exports = {
  validateSignUp,
  validateUsername,
  validatePassword,
  confirmPassword,
  validateForename,
  validateSurname,
  signUp
};

function connect(){
  /**
  * Manages the connection to the database
  */
  var con = mysql.createConnection({
    host: "localhost",
    user: "jringram",
    password: "coffeetable",
    database: "coffee_table"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to coffee_table!");
  });

  return con;
}

function validateSignUp(username, password, conf_password, forename, surname, email){
  if (confirmPassword(password, conf_password)){
    if(validator.validate(email)){
      if(validateUsername(username) && validatePassword(password) && validateForename(forename) && validateSurname(surname)){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }else{
    return false;
  }
}

function validateUsername(username){
  var usernameRegEx = /^[a-zA-Z0-9]{3,32}$/;
  if(usernameRegEx.test(username)){
    return true;
  }
  else{
    return false;
  }
}

function validatePassword(password){
  var passRegEx = /^[a-zA-Z0-9\!\#\£\$\%\&\*\^\(\)\-\_\+\=\{\[\]\@\'\}\:\<\>\,\?\.\/\\\\]{8,128}$/;
  if(passRegEx.test(password)){
    return true;
  }
  else{
    return false;
  }
}

function confirmPassword(password, confirmPassword){
  if(password == confirmPassword){
    return true;
  }
  else{
    return false;
  }
}

function validateForename(forename){
  var forenameRegEx = /^[a-zA-Z]{3,32}$/
  if(forenameRegEx.test(forename)){
    return true;
  }
  else{
    return false;
  }
}

function validateSurname(surname){
  var surnameRegEx = /[a-zA-Z ]{2,64}$/;
  if(surnameRegEx.test(surname)){
    return true;
  }
  else{
    return false;
  }
}

function signUp(username, password, confirmPassword, forename, surname, email){
  if(validateSignUp(username, password, confirmPassword, forename, surname, email)){
    var con = connect();
    var sql = "INSERT INTO users (username, password, email, forename, surname, role) VALUES ('" + username + "','" + password + "','" + email + "','" + forename + "','" + surname + "', 'test')";

    con.query(sql, function (err, result) {
      if (err){
        throw err;
      }
      try{
        var date = new Date();
        console.log("[" + date + "] " + sql + ". SUCCESS");
        return true;
      }
      catch(error){
        console.error(error);
        var date = new Date();
        console.log("[" + date + "] " + sql + ". FAILED");
        return false;
      }
    });
  }
  else{
    return false;
  }
}
