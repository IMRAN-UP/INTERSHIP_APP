const express = require('express');
const router = express.Router(); 

const { createInsurance , findInsurance , findOneInsurance , handleDialogflowRequest } = require('../controllers/insuranceController') ;

router.post('/createInsurance', createInsurance);
router.post('/findInsurance', findInsurance);
router.post('/findOneInsurance', findOneInsurance);
router.post('/dialogFlow', handleDialogflowRequest );

module.exports = router ;