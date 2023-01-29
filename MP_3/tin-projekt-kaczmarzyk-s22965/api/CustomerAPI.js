const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.getCustomers = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(cust => {
            res.status(200).json(cust);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCustomerById = (req, res, next) => {
    const custId = req.params.custId;
    
    CustomerRepository.getCustomerById(custId)
        .then(cust => {
            if (!cust) {
                res.status(404).json({
                    message: 'Customer with id: ' + custId + ' not found'
                })
            } else {
                res.status(200).json(cust);
            }
        });
};

exports.createCustomer = (req, res, next) => {
    CustomerRepository.createCustomer(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCustomer = (req, res, next) => {
    const custId = req.params.custId;
    CustomerRepository.updateCustomer(custId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Customer updated!', cust: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCustomer = (req, res, next) => {
    const custId = req.params.custId;
    CustomerRepository.deleteCustomer(custId)
        .then(result => {
            res.status(200).json({ message: 'Removed customer', cust: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
