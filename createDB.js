const MongoClient = require('mongodb').MongoClient;
const dbName = require('./config/database').dbName;
const dbUrl = require('./config/database').dbUrl;

function createDB(){
    /**
    * Manages the connection to the database
    */
   MongoClient.connect(dbUrl, function(err, db) {
    try{
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.createCollection("users", function(err, res) {
            console.log("`coffee_table` database created!");
            console.log("`users` collection created!");
            db.close();
        });
        dbo.createCollection("articles", function(err, res) {
            console.log("`articles` collection created!");
            db.close();
        });
    }
    catch(err){
        console.log("An eror occurred when creating the database");
        console.log(err);
    }
  }); 
}

createDB();