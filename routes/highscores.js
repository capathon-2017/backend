var express = require('express');
var router = express.Router();
var dbUtils = require('../lib/dblib');

var phase = [30, 10, 3];

router.get('/', function (req, res, next) {
    var tableName = 'users';
    res.setHeader('content-type', 'application/json');

    var collection = req.db.get(tableName);
    collection.find({}, {"sort": {"highscore": -1}}, function (err, data) {
        if (err) {
            // If it failed, return error
            console.log("error", err);
            res.send("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            console.log("data", data);
            if (data.length > 0) {
                res.send(data);
            } else {
                res.send("No users found");
            }
        }
    });
});

router.get('/:phase', function (req, res, next) {
    var ph = req.params.phase;
    var tableName = 'users';
    res.setHeader('content-type', 'application/json');

    var collection = req.db.get(tableName);
    collection.find({}, {"sort": {"highscore": -1}}, function (err, data) {
        if (err) {
            // If it failed, return error
            console.log("error", err);
            res.send("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            console.log("data", data);
            if (data.length > 0) {
                res.send(data.slice(0, phase[ph]));
            } else {
                res.send("No users found");
            }
        }
    });
});

module.exports = router;
