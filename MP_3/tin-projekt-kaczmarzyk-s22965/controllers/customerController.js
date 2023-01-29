const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showCustomerList = (req,res,next) => {
    CustomerRepository.getCustomers()
    .then(custs => {
        res.render('pages/customers/list', {
            custs: custs,
            navLocation: 'cust',
        });
    });
}

exports.showAddCustomerForm = (req,res,next) => {
    res.render('pages/customers/form', { 
        cust: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: "/customers/add",
        navLocation: 'cust',
        validationErrors: [] 
    });
}

exports.showCustomerDetails = (req,res,next) => {
    const custId = req.params.custId;
    CustomerRepository.getCustomerById(custId)
    .then(cust => {
        res.render('pages/customers/form', {
            cust: cust,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły klienta',
            formAction: '',
            navLocation: 'cust',
            validationErrors: []
        });
    })
}

exports.showCustomerEdit = (req,res,next) => {
    const custId = req.params.custId;
    CustomerRepository.getCustomerById(custId)
    .then(cust => {
        res.render('pages/customers/form', {
            cust: cust,
            formMode: 'edit',
            pageTitle: 'Edycja klienta',
            btnLabel: 'Edycja klienta',
            formAction: '/customers/edit',
            navLocation: 'cust',
            validationErrors: []
        });
    });
}

exports.addCustomer = (req, res, next) => {
    const custData = {...req.body};
    CustomerRepository.createCustomer(custData)
    .then(result => {
        res.redirect('/customers');
    }).catch(err => {
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type === 'unique violation') {
                e.message = 'Podany adres email jest już używany';
            }
        })
        res.render('pages/customers/form', {
            cust: custData,
            pageTitle: 'Dodawanie klienta',
            formMode: 'createNew',
            btnLabel: 'Dodaj klienta',
            formAction: '/customers/add',
            navLocation: 'cust',
            validationErrors: err.errors
        });
    });
};


exports.updateCustomer = (req, res, next) => {
    const custId = req.body.custId;
    const custData = {...req.body};
    CustomerRepository.updateCustomer(custId, custData)
    .then(result => {
        res.redirect('/customers');
    }).catch(err => {
        const customer = CustomerRepository.getCustomerById(custId);
        custData.orders = customer.orders || [];
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type === 'unique violation') {
                e.message = 'Podany adres email jest już używany';
            }
        })
        res.render('pages/customers/form', {
            cust: custData,
            formMode: 'edit',
            pageTitle: 'Edycja kuriera',
            btnLabel: 'Edytuj kuriera',
            formAction: '/customers/edit',
            navLocation: 'cust',
            validationErrors: err.errors
        });
    });
};

exports.deleteCustomer = (req, res, next) => {
    const custId = req.params.custId;
    CustomerRepository.deleteCustomer(custId)
    .then( () => {
        res.redirect('/customers');
    })
};