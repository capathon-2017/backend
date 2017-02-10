var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://192.168.1.28:27017/capathon', function (err, db) {
    if (err) throw err;

    db.collection('users').find().toArray(function (err, result) {
        if (err) throw err;

        console.log(result)
    })
});