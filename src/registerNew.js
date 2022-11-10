// const mongodb = require('mongodb').mongodb;

// mongodb.connect("mongodb://localhost:27017/chatApp2",(error,db)=>{
//     if(error) throw error;
//     console.log("Dtabase created");
//     db.close();

// });

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) console.log(err);
  console.log("Database created!");
  var dbo = db.db("chatuser");

  dbo.createCollection("newuser" , (err,res)=>{
    if(err) throw err ;
    console.log("collection created");
  db.close();
  })
});

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });
