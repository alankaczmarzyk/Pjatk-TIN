const express = require('express');
const router = express.Router();
const courApiController = require('../../api/CourierAPI');
const isAuth = require('../../middleware/isAuth');
const Role = require('../../middleware/constans');
const hasRoles = require ("../../middleware/hasRoles")



router.get('/', courApiController.getCouriers);
router.get('/:courId', courApiController.getCourierById);
router.post('/', isAuth, hasRoles(Role.Admin),courApiController.createCourier);
router.put('/:courId',isAuth, hasRoles(Role.Admin), courApiController.updateCourier);
//router.delete('/:courId', courApiController.deleteCourier);
router.delete('/:courId',isAuth, hasRoles(Role.Admin), courApiController.deleteCourier);

module.exports = router;