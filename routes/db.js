var express = require('express');
var fs = require("fs");

var router = express.Router();

/* GET users listing. */
router.get('/initialize', function (req, res, next) {
    dropData(req, res, 'users');
    var users = getFile('data\\users.json');
    insertData(req, res, 'users', users);

    dropData(req, res, 'recruiters');
    var recruiters = getFile('data\\recruiters.json');
    insertData(req, res, 'recruiters', recruiters);

    dropData(req, res, 'joboffers');
    var joboffers = getFile('data\\joboffers.json');
    insertData(req, res, 'joboffers', joboffers);
    res.send('DB reinitialized');
});

var getFile = function (fileName) {
    var data = fs.readFileSync('..\\' + fileName);
    return JSON.parse(data);
};

var getData = function (req, res, table) {
    console.log('get from ' + table);
    var db = req.db;
    var collection = db.get(table);

    collection.find({}, {}, function (e, data) {
        res.send(data);
    });
};

var dropData = function (req, res, table) {
    console.log('drop all from ' + table);
    var db = req.db;
    var collection = db.get(table);

    collection.drop(function (err, doc) {
        if (err) {
            // If it failed, return error
            console.log("error", err);
            return ("There was a problem dropping the collection.");
        } else {
            // And forward to success page
            console.log("doc", doc);
            return ("Dropped");
        }
    });
};

var insertData = function (req, res, table, data) {
    console.log('insert ' + JSON.stringify(data) + ' in ' + table);
    var db = req.db;
    var collection = db.get(table);

    // Submit to the DB
    collection.insert(data, function (err, doc) {
        if (err) {
            // If it failed, return error
            console.log("error", err);
            return ("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            console.log("doc", doc);
            return ("added");
        }
    });
};


module.exports = router;
