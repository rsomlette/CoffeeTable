const mysql = require('mysql');
const mongo = require('mongodb'); 
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/coffee_table';
const db = "coffee_table"
const validator = require("email-validator");
const crypto = require("crypto");

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
        let hashedPass = await hashString(password)
        MongoClient.connect(dbUrl, function(err, db) {
            if (err) throw err;
            const dbo = db.db("coffee_table");
            let newUser = { username: username, password: hashedPass, email: email, forename: forename, surname: surname };
            dbo.collection("users").insertOne(newUser, function(err, res) {
              if (err) throw err;
              console.log("[" + new Date() + "] db.users.insertOne(" + newUser + "). SUCCESS");
              db.close();
            });
        });
        resolve(true);
      }
      else{
        const notValidatedMessage = "Not validated. Password may not be sufficiently complex, email may be invalid, username may already exist, etc.";
        resolve(false);
      }
    }
    catch(error){
      console.error(error);
      console.log("[" + new Date() + "] db.users.insertOne(" + newUsers + "). FAILED");
      reject(false);
    }
  });
  return signingUp
    .then((success) => {
      return success
    }).catch((error) => {
      return false;
    });
}

async function signIn(username, password){
  let success = new Promise(async function(resolve, reject){
    try{
      MongoClient.connect(dbUrl, async function(err, db){
        if (err) throw err;
        let dbo = db.db("coffee_table");
        let hashedPass = await hashString(password);
        dbo.collection("users").findOne({username:username, password: hashedPass}, function(err, result){
          if (err) throw err;
          console.log("Result is: " + result);
          if (result !== null){
            console.log("[" + new Date() + "] db.users.findOne({username: " + username + ", password: " + password + "}). SUCCESS");
            resolve(true);
          }
          else{
            console.log("[" + new Date() + "] db.users.findOne({username: " + username + ", password: " + password + "}). FAILED");
            resolve(false);  
          }
        });
      });
    }
    catch(err){
      console.log(err);
      console.log("[" + new Date() + "] db.users.findOne({username: " + username + ", password: " + password + "}). FAILED");
      reject(false);
    }
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
    try{
      MongoClient.connect(dbUrl, function(err, db){
        if (err) throw err;
        var dbo = db.db("coffee_table");
        dbo.collection("users").findOneAndDelete({username: username}, function(error, result){
          if (err) throw err;
          if(result !== null){
            console.log("RESULT IS:" + result)
            console.log("Removed: " + result.username);
            resolve(true);
          }
          else{
            console.log("User does not exist");
            resolve(false);
          }
        })
      });
    }
    catch(err){
      console.log(err);
      reject(false);
    }
  });
  return success;
}
/**
* Returns the requested username from the database if it exists
* @param {string} username - Username to search for
* @return {string} username if the username exists, false in any other circumstance
*/
async function getUsername(username){
  let success = new Promise(function (resolve, reject){
    MongoClient.connect(dbUrl, function(err, db) {
      try{
        if (err) throw err;
        var dbo = db.db("coffee_table");
        dbo.collection("users").findOne({username: username}, function(err, result){
          if (err) throw err;
          if (result !== null){
            resolve(result.username);
          }
          else{
            resolve(false);
          }
        });
      }
      catch(err){
        console.log("Error occurred when checking for username " + username);
        console.log(err);
        reject(false);
      }
    });
  });
  result = await success;
  return success;
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
