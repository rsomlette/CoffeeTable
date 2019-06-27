var validator = require("email-validator");
var dao = require('../model/UserDAO.js');

exports.signup = function(username, password, conf_password, forename, surname, email){
  var userRegEx = /^[a-zA-Z0-9]{3,32}$/
  var forenameRegEx = /^[a-zA-Z]{3,32}$/
  var surnameRegEx = /[a-zA-Z ]{2,64}$/
  var passRegEx = /^[a-zA-Z0-9\!\#\£\$\%\&\*\^\(\)\-\_\+\=\{\[\]\@\'\}\:\<\>\,\?\.\/\\\\]{8,128}$/

  if(password == conf_password){
    if(validator.validate("test@email.com")){
      if(userRegEx.test(username) && forenameRegEx.test(forename) && surnameRegEx.test(surname) && passRegEx.test(password)){
        console.log("Pass");
        dao.createUser(username, password, conf_password, forename, surname, email);
        return true;
      }
    }
  }
}
