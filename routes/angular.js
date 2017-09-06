/**
 * Created by sylarhuang on 2017/8/11.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendfile('app/index.html');
});

module.exports = router;
