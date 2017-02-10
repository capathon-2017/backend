var express = require('express');
var router = express.Router();
var dbUtils = require('../lib/dblib');

var tableName = 'users';

/* GET users listing. */
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

router.get('/:name', function (req, res, next) {
    var name = req.params.name;
    res.setHeader('content-type', 'application/json');
    dbUtils.getData(req.db, tableName, {"name": name}, function (err, data) {
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
                res.send("No user found");
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

router.post('/:name', function (req, res, next) {
    var name = req.params.name;
    var data;
    if (Object.keys(req.body).length > 0) {
        data = req.body;
    } else {
        data = req.query;
    }
    dbUtils.update(req.db, tableName, {"name": name}, data, function (err, data) {
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

router.delete('/:name', function (req, res, next) {
    var name = req.params.name;
    dbUtils.removeData(req.db, tableName, {"name":name}, function (err, data) {
        if (err) {
            // If it failed, return error
            console.log("error", err);
            res.send("There was a problem removing the information from the database.");
        } else {
            // And forward to success page
            console.log("data", data);
            res.send(data);
        }
    });
});

module.exports = router;
