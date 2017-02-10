var express = require('express');
var router = express.Router();
var dbUtils = require('../lib/dblib');

var tableName = 'joboffers';

/* GET joboffers listing. */
router.get('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    dbUtils.getData(req.db, tableName, {}, function (err, data) {
        if (err) {
            // If it failed, return error
            console.log("error", err);
            res.send("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            console.log("data", data);
            res.send(data);
        }
    });
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    res.setHeader('content-type', 'application/json');
    dbUtils.getData(req.db, tableName, {"id": id}, function (err, data) {
        if (err) {
            // If it failed, return error
            console.log("error", err);
            res.send("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            console.log("data", data);
            if (data.length > 0) {
                res.send(data[0]);
            } else {
                res.send("No job found");
            }
        }
    });
});

router.post('/', function (req, res, next) {
    var data;
    if (Object.keys(req.body).length > 0) {
        data = req.body;
    } else {
        data = req.query;
    }
    dbUtils.insertData(req.db, tableName, data, function (err, data) {
        if (err) {
            console.log("error", err);
            res.send("There was a problem adding the information to the database.");
        } else {
            console.log("data", data);
            var resp = {"success": true};
            res.send(resp);
        }
    });
});

router.post('/:id', function (req, res, next) {
    var id = req.params.id;
    var data;
    if (Object.keys(req.body).length > 0) {
        data = req.body;
    } else {
        data = req.query;
    }
    dbUtils.update(req.db, tableName, {"id": id}, data, function (err, data) {
        if (err) {
            console.log("error", err);
            res.send("There was a problem updating the information to the database.");
        } else {
            console.log("data", data);
            var resp = {"success": true};
            res.send(resp);
        }
    });
});

module.exports = router;
