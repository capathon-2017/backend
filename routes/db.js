var express = require('express');
var dbUtils = require('../lib/dblib');

var router = express.Router();

/* GET users listing. */
router.get('/initialize', function (req, res, next) {
    if (req.query['reset']) {
        dbUtils.dropData(req.db, 'users', function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });
        var users = dbUtils.getFile('data\\users.json');
        dbUtils.insertData(req.db, 'users', users, function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });

        dbUtils.dropData(req.db, 'recruiters', function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });
        var recruiters = dbUtils.getFile('data\\recruiters.json');
        dbUtils.insertData(req.db, 'recruiters', recruiters, function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });

        dbUtils.dropData(req.db, 'joboffers', function (err, doc) {
            if (err) {
                console.log("error", err);
            } else {
                console.log("doc", doc);
            }
        });
        var joboffers = dbUtils.getFile('data\\joboffers.json');
        dbUtils.insertData(req.db, 'joboffers', joboffers, function (err, doc) {
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

module.exports = router;
