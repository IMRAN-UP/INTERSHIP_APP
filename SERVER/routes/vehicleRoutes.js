const express = require('express');
const router = express.Router(); 

const { createVehicle , findVehicle , updateVehicle , deleteVehicle  } = require('../controllers//vehicleController') ;

router.post('/createVehicle', createVehicle) ;
router.post('/findVehicle', findVehicle) ;
router.put('/updateVehicle/:id', updateVehicle);
router.delete('/deleteVehicle/:id', deleteVehicle);  

module.exports = router ;