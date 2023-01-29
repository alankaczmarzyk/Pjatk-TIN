const express = require('express');
const router = express.Router();
const ordApiController = require('../../api/OrderAPI');
const isAuth = require('../../middleware/isAuth');
const Role = require('../../middleware/constans');
const hasRoles = require ("../../middleware/hasRoles")


router.get('/', ordApiController.getOrders);
router.get('/:ordId', ordApiController.getOrderById);
router.post('/', ordApiController.createOrder);
router.put('/:ordId', ordApiController.updateOrder);
router.delete('/:ordId',isAuth, hasRoles(Role.Admin), ordApiController.deleteOrder);

module.exports = router;