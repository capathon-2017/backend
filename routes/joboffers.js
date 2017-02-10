var express = require('express');
var router = express.Router();
var dbUtils = require('../lib/dblib');

var tableName = 'joboffers';

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

router.post('/', function (req, res, next) {
    var data;
    if (Object.keys(req.body).length > 0) {
        data = req.body;
    } else {
        data = req.query;
    }
    Utils.insertData(req.db, tableName, data, function (err, data) {
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

module.exports = router;
