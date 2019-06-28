var dao = require('../model/UserDAO.js');

exports.signup = function(username, password, confirmPassword, forename, surname, email, report){
  return success = dao.signUp(username, password, confirmPassword, forename, surname, email);
}
