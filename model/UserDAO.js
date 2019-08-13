const mysql = require('mysql');
const validator = require("email-validator");
const crypto = require("crypto");
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
      let con = connect();
      let sql = "SELECT * FROM users WHERE username=\"" + username + "\" AND password=\"" + hashString(password) + "\"";
      con.query(sql, function (err, result) {
        try{
          console.log("[" + new Date() + "] " + sql + ". SUCCESS");
          console.log(result);
          con.destroy();
          if(result.length===1){
            return done(null, user);
          }
          else{
            return done(null, false, { message: 'Incorrect username or password.'});
          }
        }
        catch(error){
          console.error(error);
          console.log("[" + new Date() + "] " + sql + ". FAILED");
          con.destroy();
          return done(error);
        }
      });
    }
));

module.exports = {
  validateSignUp,
  validateUsername,
  validatePassword,
  confirmPassword,
  validateForename,
  validateSurname,
  signUp,
  signIn,
  deleteUser,
  hashString,
  getUsername,
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
  const signingUp = new Promise(async function(resolve, reject){
    try{
      const userAlreadyExists = await getUsername(username);
      if(validateSignUp(username, password, confirmPassword, forename, surname, email) && (userAlreadyExists == false)){
        let con = connect();
        let hashedPass = await hashString(password)
        let sql = "INSERT INTO users (username, password, email, forename, surname, role) VALUES ('" + username + "','" + hashedPass + "','" + email + "','" + forename + "','" + surname + "', 'test')";

        con.query(sql, function (err, result) {
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
        const notValidatedMessage = "Not validated. Password may not be sufficiently complex, email may be invalid, username may already exist, etc.";
        const notValidated = new Error(notValidatedMessage);
        reject(notValidatedMessage);
      }
    }
    catch{
      reject(false); //Caused unhandled rejection error
    }
  });
  return signingUp
    .then((success) => {
      return success
    }).catch((error) => {
      return false;
      //return false;
    });

  //return signingUp;
}

async function signIn(username, password){
  let success = new Promise(async function(resolve, reject){
    let con = connect();
    let sql = "SELECT * FROM users WHERE username=\"" + username + "\" AND password=\"" + await hashString(password) + "\"";
    con.query(sql, function (err, result) {
      try{
        console.log("[" + new Date() + "] " + sql + ". SUCCESS");
        console.log(result);
        con.destroy();
        if(result.length===1){
          resolve(true)
        }
        else{
          resolve(false)
        }
      }
      catch(error){
        console.error(error);
        console.log("[" + new Date() + "] " + sql + ". FAILED");
        con.destroy();
        reject(false)
      }
    });
  });
  return success;
}

/**
* Deletes user from database
* @param {string} username - the username of the user to delete
* @return {boolean} true if user has been deleted; false if user has not been deleted.
*/
async function deleteUser(username){
  let success = new Promise(function (resolve, reject){
    let con = connect();
    let sql = "DELETE FROM users WHERE username =\"" + username + "\"";
    con.query(sql, function (err, result) {
      try{
        console.log("[" + new Date() + "] " + sql + ". SUCCESS");
        con.destroy();
        resolve(true);
      }
      catch(error){
        console.error(error);
        console.log("[" + new Date() + "] " + sql + ". FAILED");
        con.destroy();
        reject(Error("It broke"));
      }
    });
  });
  return success;
}
/**
* Returns the requested username from the database if it exists
* @param {string} username - Username to search for
*/
async function getUsername(username){
  let success = new Promise(function (resolve, reject){
    let con = connect();
    let sql = "SELECT username FROM users WHERE username=\"" + username + "\"";
    con.query(sql, function (err, result) {
      try{
        console.log("[" + new Date() + "] " + sql + ". SUCCESS");
        con.destroy();
        console.log(result);
        resolve(result);
      }
      catch(error){
        console.error(error);
        console.log("[" + new Date() + "] " + sql + ". FAILED");
        con.destroy();
        reject(new Error("It broke"));
      }
    });
  });
  results = await success;
  console.log(results);
  if(results.length > 0){
    return results[0].username;
  }
  else{
    return false;
  }
}

/**
* Hashes a given string using a SHA256
* @param {string} secret - the string to hash
* @return {string} The hashed secret, given in hex encoding
*/
async function hashString(secret){
  let hashedSecret = await crypto.createHash("sha256").update(secret).digest("hex");
  return hashedSecret;
}
