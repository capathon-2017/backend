var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://192.168.1.28:27017/capathon';
console.log("start db");

MongoClient.connect(dbUrl, function (err, db) {
    if (err) throw err;

    db.collection('users').find().toArray(function (err, result) {
        if (err) throw err;

        console.log(result)
    })
});
//
// var db = function () {
//     return MongoClient.connect('mongodb://192.168.1.28:27017/capathon', function (err, db) {
//         if (err) throw err;
//         return db;
//     });
// };
// var getUsers = function () {
//     return db().getCollection('users').find().toArray(function (err, result) {
//         if (err) throw err;
//
//         return result;
//     })
// };
// console.log(getUsers());