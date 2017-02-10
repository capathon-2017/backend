var express = require('express');
var router = express.Router();

var tableName = 'recruiters';

/* GET recruiters listing. */
router.get('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    getData(req.db, tableName, {}, function (err, data) {
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
    getData(req.db, tableName, {"name": name}, function (err, data) {
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
    insertData(req.db, tableName, data, function (err, data) {
        if (err) {
            console.log("error", err);
            res.send("There was a problem adding the information to the database.");
        } else {
            console.log("data", data);
            var resp = {"success":true};
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
    update(req.db, tableName, {"name": name}, data, function (err, data) {
        if (err) {
            console.log("error", err);
            res.send("There was a problem updating the information to the database.");
        } else {
            console.log("data", data);
            var resp = {"success":true};
            res.send(resp);
        }
    });
});

var getData = function (db, table, selector, callback) {
    console.log('get from ' + table);
    var collection = db.get(table);
    collection.find(selector, {}, callback);
};

var update = function (db, table, selector, data, callback) {
    console.log('update ' + JSON.stringify(selector) + ' in table ' + table + JSON.stringify(data));
    var collection = db.get(table);
    collection.update(selector, {$set: data}, callback);
};

var insertData = function (db, table, data, callback) {
    console.log('insert ' + JSON.stringify(data) + ' in ' + table);
    var collection = db.get(table);
    collection.insert(data, callback);
};


module.exports = router;
