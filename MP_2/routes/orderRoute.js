const express = require('express');
const router = express.Router();

const orderControler = require('../controllers/orderController');

router.get('/', orderControler.showOrderList);
router.get('/add',orderControler.showAddOrderForm);
router.get('/details/:ordId',orderControler.showOrderDetails);
router.get('/edit/:ordId',orderControler.showOrderEdit);

router.post('/add', orderControler.addOrder);
router.post('/edit', orderControler.updateOrder);
router.get('/delete/:ordId', orderControler.deleteOrder);


module.exports=router;