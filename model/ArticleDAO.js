const dbName = require('../config/database').dbName;
const dbUrl = require('../config/database').dbUrl;
const MongoClient = require('mongodb').MongoClient;

module.exports = {
    saveArticle,
}

async function saveArticle(title, markdown){
    let statusObj = new Promise(async (resolve, reject) => {
        try{
            MongoClient.connect(dbUrl, (err, db) => {
                if(err) throw err;
                const dbo = db.db(dbName);
                const date = new Date();
                const article = {title: title, content: markdown, date: {day: date.getDay(), month: date.getMonth()}, status: "unpublished"};
                dbo.collection("articles").insertOne(article, () =>{
                    if (err) throw err;
                    db.close();
                })
            });
            resolve({});
        }
        catch(err){
            console.log(err);
            resolve({});
        }
    });
    return statusObj;
};