var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var users = [{'id': 1, 'name': 'pietje'}];
    res.setHeader('content-type', 'application/json');
    res.send(users);
});

module.exports = router;
