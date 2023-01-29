const express = require('express');
const router = express.Router();

const courierControler = require('../controllers/courierController');

router.get('/', courierControler.showCourierList);
router.get('/add',courierControler.showAddCourierForm);
router.get('/details/:courId',courierControler.showCourierDetails);
router.get('/edit/:courId',courierControler.showCourierEdit);


router.post('/add', courierControler.addCourier);
router.post('/edit', courierControler.updateCourier);
router.get('/delete/:courId', courierControler.deleteCourier);

module.exports=router;