var express = require('express');
var router = express.Router();
const https = require('https');


router.get('/', function (req, resp, next) {
    res.send('Hi');

    // https.get('https://hackathon.dominos.cloud/', function (res) {
    //     console.log('statusCode:', res.statusCode);
    //     console.log('headers:', res.headers);
    //
    //     res.on('data', function (d) {
    //         process.stdout.write(d);
    //         resp.setHeader('content-type', 'text/html');
    //         resp.send(d);
    //     });
    //
    // }).on('error', function (e) {
    //     console.error(e);
    // });

});


module.exports = router;

