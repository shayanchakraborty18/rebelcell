const express = require('express');
const router = express.Router();

const {
  newContact
}  = require('../controllers/cmsController');

router.route('/contact/new').post(newContact);



module.exports = router;
