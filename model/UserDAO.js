const mysql = require('mysql');
const validator = require("email-validator");

module.exports = {
  validateSignUp,
  validateUsername,
  validatePassword,
  confirmPassword,
  validateForename,
  validateSurname,
  signUp,
  deleteUser
};

function connect(){
  /**
  * Manages the connection to the database
  */
  let con = mysql.createConnection({
    //Obviously change these details when deploying!
    host: "localhost",
    user: "jringram",
    password: "coffeetable",
    database: "coffee_table"
  });

  con.connect(function(err) {
    if (err) throw err;
    else console.log("Connected to coffee_table!");
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
  let usernameRegEx = /^[a-zA-Z0-9]{3,32}$/;
  if(usernameRegEx.test(username)){
    return true;
  }
  else{
    return false;
  }
}

function validatePassword(password){
  let passRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])\S{8,128}$/;
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
  let forenameRegEx = /^[a-zA-Z]{2,32}$/
  if(forenameRegEx.test(forename)){
    return true;
  }
  else{
    return false;
  }
}

function validateSurname(surname){
  let surnameRegEx = /^[a-zA-Z ]{2,64}$/;
  if(surnameRegEx.test(surname)){
    return true;
  }
  else{
    return false;
  }
}

async function signUp(username, password, confirmPassword, forename, surname, email){
  let success = new Promise(function(resolve, reject){
    if(validateSignUp(username, password, confirmPassword, forename, surname, email)){
      let con = connect();
      let sql = "INSERT INTO users (username, password, email, forename, surname, role) VALUES ('" + username + "','" + password + "','" + email + "','" + forename + "','" + surname + "', 'test')";

      con.query(sql, function (err, result) {
        if (err){
          throw err;
          con.destroy();
          reject(false);
        }
        try{
          console.log("[" + new Date() + "] " + sql + ". SUCCESS");
          con.destroy();
          resolve(true);
        }
        catch(error){
          console.error(error);
          console.log("[" + new Date() + "] " + sql + ". FAILED");
          con.destroy();
          reject(false);
        }
      });
    }
    else{
      console.log("Not Validated!");
      con.destroy();
      reject(false);
    }
  });
  return success;
}

async function deleteUser(username){
  let success = new Promise(function (resolve, reject){
    let con = connect();
    let sql = "DELETE FROM users WHERE username =\"" + username + "\"";
    con.query(sql, function (err, result) {
      if (err){
        throw err;
        con.destroy();
        reject(false);
      }
      try{
        console.log("[" + new Date() + "] " + sql + ". SUCCESS");
        con.destroy();
        resolve(true);
      }
      catch(error){
        console.error(error);
        console.log("[" + new Date() + "] " + sql + ". FAILED");
        con.destroy();
        reject(false);
      }
    });
  });
  return success;
}
