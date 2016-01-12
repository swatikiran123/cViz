var express = require('express');
var router = express.Router();

// Create endpoint handlers for /api/app/
router.route('/info')
  .get(getInfo);


module.exports = router;

function getInfo(req, res) {

	var appInfoServ = require('../services/appService');
	var appInfo = appInfoServ.info();

    if (appInfo) {
        res.send(appInfo);
    } else {
        res.status(404).send();
    }
}