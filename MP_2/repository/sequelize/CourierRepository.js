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
    });
};

exports.updateCourier = (courierId, courData) => {
    const firstName = courData.firstName;
    const lastName = courData.lastName;
    return Courier.update(courData, {where: {_id: courierId}});
};

exports.deleteCourier = (courierId) => {
    return Courier.destroy({
        where: { _id: courierId }
    });

}; 