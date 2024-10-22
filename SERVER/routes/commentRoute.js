const express = require('express');
const router = express.Router(); 

const { createComment , findComment  } = require('../controllers/commentController') ;

router.post('/createComment', createComment) ;
router.post('/findComment', findComment) ;

module.exports = router ;