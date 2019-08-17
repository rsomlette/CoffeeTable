const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/coffee_table';

function createDB(){
    /**
    * Manages the connection to the database
    */
   MongoClient.connect(dbUrl, function(err, db) {
    try{
        if (err) throw err;
        var dbo = db.db("coffee_table");
        dbo.createCollection("users", function(err, res) {
            console.log("`coffee_table` database created!");
            console.log("`users` collection created!");
        db.close();
        });
    }
    catch{

    }
  }); 
}

createDB();