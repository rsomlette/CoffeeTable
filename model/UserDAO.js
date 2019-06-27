const db = require('../connection.js');
const mysql = require('mysql');

exports.createUser = function(username, password, conf_password, forename, surname, email){
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

  var sql = "INSERT INTO users (username, password, email, forename, surname, role) VALUES ('" + username + "','" + password + "','" + email + "','" + forename + "','" + surname + "', 'test')";

  con.query(sql, function (err, result) {
    if (err){
      throw err;
    }
    try{
      var date = new Date();
      console.log("[" + date + "] " + sql);
      console.log("1 record inserted");
      return true;
    }
    catch(error){
      console.error(error);
      return false;
    }
  });
}
