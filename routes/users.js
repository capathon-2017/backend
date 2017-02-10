var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    getData(req, res, 'users');
});

router.post('/add', function (req, res, next) {
    var data;
    if (Object.keys(req.body).length > 0) {
        data = req.body;
    } else {
        data = req.query;
    }
    insertData(req, res, 'users', data);
});

var getData = function (req, res, table) {
    console.log('get from ' + table);
    var db = req.db;
    var collection = db.get(table);

    collection.find({}, {}, function (e, data) {
        res.send(data);
    });
};

var insertData = function (req, res, table, data) {
    console.log('insert ' + JSON.stringify(data) + ' in ' + table);
    var db = req.db;
    var collection = db.get(table);

    // Submit to the DB
    collection.insert(data, function (err, doc) {
        console.log("error", err);
        console.log("doc", doc);
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            res.send("added");
        }
    });
};


module.exports = router;
