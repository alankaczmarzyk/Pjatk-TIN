const express = require('express');
const router = express.Router();

const courApiController = require('../../api/CourierAPI');

router.get('/', courApiController.getCouriers);
router.get('/:courId', courApiController.getCourierById);
router.post('/', courApiController.createCourier);
router.put('/:courId', courApiController.updateCourier);
router.delete('/:courId', courApiController.deleteCourier);

module.exports = router;