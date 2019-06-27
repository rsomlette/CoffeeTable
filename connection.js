const mysql = require('mysql');

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
