const express = require('express');
const router = express.Router();

const ordApiController = require('../../api/OrderAPI');

router.get('/', ordApiController.getOrders);
router.get('/:ordId', ordApiController.getOrderById);
router.post('/', ordApiController.createOrder);
router.put('/:ordId', ordApiController.updateOrder);
router.delete('/:ordId', ordApiController.deleteOrder);

module.exports = router;