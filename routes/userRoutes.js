const express = require('express');

const { paginate, sort } = require('../controllers/userController');

const router = express.Router();

router.get('/paginate', paginate);
router.get('/sort', sort);

module.exports = router;
