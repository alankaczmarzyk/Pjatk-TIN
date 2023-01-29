const OrderRepository = require('../repository/sequelize/OrderRepository');
const CourierRepository = require('../repository/sequelize/CourierRepository');
const CustomerRepository = require('../repository/sequelize/CustomerRepository');
const { or } = require('sequelize');


exports.showOrderList = (req,res,next) => {
    OrderRepository.getOrders()
    .then(ords => {
        res.render('pages/orders/list', {
            ords: ords,
            navLocation: 'ord',
        });
    });
}

exports.showAddOrderForm = (req,res,next) => {
    let allCours, allCusts;
    CourierRepository.getCouriers()
        .then(cours => {
            allCours = cours;
            return CustomerRepository.getCustomers();
        })
        .then(custs => {
            allCusts = custs;
            res.render('pages/orders/form', {
                ord: {},
                formMode: 'createNew',
                allCours: allCours,
                allCusts: allCusts,
                pageTitle: 'Nowe zamówienie',
                btnLabel: 'Dodaj zamówienie',
                formAction: '/orders/add',
                navLocation: 'ord',
                validationErrors: []
            });
        });
}

exports.showOrderDetails = (req,res,next) => {
    const ordId = req.params.ordId;
    let allCours, allCusts, allOrds;

    OrderRepository.getOrders()
        .then(ords => {
            allOrds = ords;
            return CourierRepository.getCouriers();
        })
        .then(cours => {
            allCours = cours;
            return CustomerRepository.getCustomers();
        })
        .then(custs => {
            allCusts = custs;
            return OrderRepository.getOrderById(ordId);
        }).then(ord => {
        res.render('pages/orders/form', {
            ord: ord,
            formMode: 'showDetails',
            allCours: allCours,
            allCusts: allCusts,
            allOrds: allOrds,
            pageTitle: 'Szczegóły zamówienia',
            formAction: '/orders/details',
            navLocation: 'ord',
            validationErrors: []
        });
    });
}

exports.showOrderEdit = (req,res,next) => {
    const ordId = req.params.ordId;
    let allCours, allCusts, allOrds;

    OrderRepository.getOrders()
        .then(ords => {
            allOrds = ords;
            return CourierRepository.getCouriers();
        })
        .then(cours => {
            allCours = cours;
            return CustomerRepository.getCustomers();
        })
        .then(custs => {
            allCusts = custs;
            return OrderRepository.getOrderById(ordId);
        }).then(ord => {
        res.render('pages/orders/form', {
            ord: ord,
            formMode: 'edit',
            allCours: allCours,
            allCusts: allCusts,
            allOrds: allOrds,
            pageTitle: 'Edycja zamówienia',
            btnLabel: 'Edytuj',
            formAction: '/orders/edit',
            navLocation: 'ord',
            validationErrors: []
        });
    });
}


exports.addOrder = (req, res, next) => {
    const ordData = {...req.body};
    ordData.date=ordData.date.length===0? null : ordData.date;
    let allCours, allCusts;
    CourierRepository.getCouriers()
        .then(cours => {
            allCours = cours;
            return CustomerRepository.getCustomers();
        }).then(custs => {
            allCusts = custs;
        return OrderRepository.createOrder(ordData)
            .then(result => {
                 res.redirect('/orders');
            }).catch(err => {
                res.render('pages/orders/form', {
                    ord: ordData,
                    pageTitle: 'Dodawanie zamówienia',
                    formMode: 'createNew',
                    btnLabel: 'Dodaj',
                    formAction: '/orders/add',
                    navLocation: 'ord',
                    allCours: allCours,
                    allCusts: allCusts,
                    validationErrors: err.errors
                });
            })
    });
};


exports.updateOrder = (req, res, next) => {
    const ordId = req.body.ordId;
    const ordData = {...req.body};
    ordData.date=ordData.date.length===0? null : ordData.date;
    let allCours, allCusts;
    CourierRepository.getCouriers()
        .then(cours => {
            allCours = cours;
            return CustomerRepository.getCustomers();
        }).then(custs => {
        allCusts = custs;
        return OrderRepository.updateOrder(ordId, ordData)
            .then(result => {
                 res.redirect('/orders');
            }).catch(err => {
                res.render('pages/orders/form', {
                    ord: ordData,
                    pageTitle: 'Edycja zamówienia',
                    formMode: 'edit',
                    btnLabel: 'Dodaj',
                    formAction: '/orders/edit',
                    navLocation: 'ord',
                    allCours: allCours,
                    allCusts: allCusts,
                    validationErrors: err.errors
                });
            });
    })
};


exports.deleteOrder = (req, res, next) => {
    const ordId = req.params.ordId;
    OrderRepository.deleteOrder(ordId)
        .then(result => {
            res.redirect('/orders');
        });
};