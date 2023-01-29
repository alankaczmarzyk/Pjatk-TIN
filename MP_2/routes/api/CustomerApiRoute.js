const express = require('express');
const router = express.Router();

const custApiController = require('../../api/CustomerAPI');

router.get('/', custApiController.getCustomers);
router.get('/:custId', custApiController.getCustomerById);
router.post('/', custApiController.createCustomer);
router.put('/:custId', custApiController.updateCustomer);
router.delete('/:custId', custApiController.deleteCustomer);

module.exports = router;