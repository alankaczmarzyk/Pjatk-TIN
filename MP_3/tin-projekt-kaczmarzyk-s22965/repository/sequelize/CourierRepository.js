const Courier = require("../../model/sequelize/Courier");
const Order = require("../../model/sequelize/Order");
const Customer = require("../../model/sequelize/Customer");

exports.getCouriers = () => {
    return Courier.findAll();
};

exports.getCourierById = (courId) => {
    return Courier.findByPk(courId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: Customer,
                    as: 'customer'
                }]
            }]
        });
};

exports.createCourier= (newCourData) => {
    return Courier.create({
       firstName: newCourData.firstName,
       lastName: newCourData.lastName,
       email: newCourData.email,
       password: newCourData.password,
       role: newCourData.role
    });
};

exports.updateCourier = (courierId, courData) => {
    return Courier.update(courData, {where: {_id: courierId},individualHooks: true});
};

exports.deleteCourier = (courierId) => {
    return Courier.destroy({
        where: { _id: courierId }
    });

}; 

exports.findByEmail = (email) => {
    return Courier.findOne({
        where: {email: email}
    });
}