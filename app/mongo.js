const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://app:1999Katet@cluster0-8pfjv.mongodb.net/sandbox?retryWrites=true';

// Database Name
const dbName = 'sandbox';

var db
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db()

});

module.exports = {
    getDb: function(){
        return db;
    }
}

