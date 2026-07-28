const refreshController = require('../controller/refreshTokenController');
const express = require('express');
const router = express.Router();

router.post('/', refreshController.handleRefreshToken)

module.exports = router