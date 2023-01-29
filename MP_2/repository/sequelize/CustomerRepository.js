const Customer = require("../../model/sequelize/Customer");
const Courier = require("../../model/sequelize/Courier");
const Order = require("../../model/sequelize/Order");


exports.getCustomers = () => {
    return Customer.findAll();
};

exports.getCustomerById = (custId) => {
    return Customer.findByPk(custId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: Courier,
                    as: 'courier'
                }]
            }]
        });
};

exports.createCustomer= (newCustData) => {
    return Customer.create({
       firstName: newCustData.firstName,
       lastName: newCustData.lastName,
       street: newCustData.street,
       city: newCustData.city,
       zipCode: newCustData.zipCode,
       email: newCustData.email
    });
};

exports.updateCustomer = (customerId, custData) => {
    const firstName = custData.firstName;
    const lastName = custData.lastName;
    return Customer.update(custData, {where: {_id: customerId}});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });

}; 