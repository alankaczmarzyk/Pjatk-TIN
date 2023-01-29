const Sequelize = require('sequelize');

const Order = require("../../model/sequelize/Order");
const Courier = require("../../model/sequelize/Courier");
const Customer = require("../../model/sequelize/Customer");

exports.getOrders = () => {
    return Order.findAll({include: [
            {
            model: Courier,
            as: 'courier'
            },
            {
                model: Customer,
                as: 'customer'
            }]
        });
};

exports.getOrderById = (orderId) => {
    return Order.findByPk(orderId, {include: [
        {
                model: Courier,
                as: 'courier'
                },
                {
                    model: Customer,
                    as: 'customer'
                }]
        });
};

exports.createOrder = (data) => {
    console.log(JSON.stringify(data));

    return Order.create({
        courier_id: data.courier_id,
        customer_id: data.customer_id,
        weight: data.weight,
        date: data.date,
        price: data.price

    })
};


exports.updateOrder = (orderId, data) => {
    return Order.update(data, {where: {_id: orderId}});
};

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: { _id: orderId }
    });

}; 

exports.deleteManyOrders = (orderIds) => {
    return Order.find({ _id: { [Sequelize.Op.in]: orderIds }})
}