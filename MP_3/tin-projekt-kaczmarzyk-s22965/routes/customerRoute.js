const express = require('express');
const router = express.Router();

const customerControler = require('../controllers/customerController');

router.get('/', customerControler.showCustomerList);
router.get('/add',customerControler.showAddCustomerForm);
router.get('/details/:custId',customerControler.showCustomerDetails);
router.get('/edit/:custId',customerControler.showCustomerEdit);


router.post('/add', customerControler.addCustomer);
router.post('/edit', customerControler.updateCustomer);
router.get('/delete/:custId', customerControler.deleteCustomer);

module.exports=router;