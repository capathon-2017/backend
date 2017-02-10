var express = require('express');
var fs = require("fs");

var router = express.Router();

/* GET users listing. */
router.get('/initialize', function (req, res, next) {
    if (req.query['reset']) {
        dropData(req.db, 'users', function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });
        var users = getFile('data\\users.json');
        insertData(req.db, 'users', users, function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });

        dropData(req.db, 'recruiters', function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });
        var recruiters = getFile('data\\recruiters.json');
        insertData(req.db, 'recruiters', recruiters, function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });

        dropData(req.db, 'joboffers', function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });
        var joboffers = getFile('data\\joboffers.json');
        insertData(req.db, 'joboffers', joboffers, function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });
        res.send('DB reinitialized');
    } else {
        res.send('DB NOT reinitialized');
    }
});

var getFile = function (fileName) {
    var data = fs.readFileSync(fileName);
    return JSON.parse(data);
};

var dropData = function (db, table, callback) {
    console.log('drop all from ' + table);
    var collection = db.get(table);
    collection.drop(callback);
};

var insertData = function (db, table, data, callback) {
    console.log('insert ' + JSON.stringify(data) + ' in ' + table);
    var collection = db.get(table);
    collection.insert(data, callback);
};

module.exports = router;
