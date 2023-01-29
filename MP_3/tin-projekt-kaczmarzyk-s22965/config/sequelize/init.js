const sequelize = require('./sequelize');
const Courier = require('../../model/sequelize/Courier');
const Customer = require('../../model/sequelize/Customer');
const Order = require('../../model/sequelize/Order');

module.exports = () => {
    Courier.hasMany(Order, {as: 'orders', foreignKey: {name: 'courier_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Courier, {as: 'courier', foreignKey: {name: 'courier_id', allowNull: false}});
    Customer.hasMany(Order, {as: 'orders', foreignKey: {name: 'customer_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Customer, {as: 'customer', foreignKey: {name: 'customer_id', allowNull: false}});

   
    let allCouriers, allCustomers;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Courier.findAll();
        })
        .then(cour => {
            if( !cour || cour.length == 0 ) {
                return Courier.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', email: "kowalski@acm.com", password:'12345' , role: "admin"},
                    {firstName: 'Mateusz', lastName: 'Nowak',email: "nowak@acm.com", password:'12345' ,role: "user"},
                    {firstName: 'Victor', lastName: 'Man',email: "man@acm.com", password: '12345',role: "user"},
                ])
                .then( () => {
                    return Courier.findAll();
                });
            } else {
                return cour;
            }
        })
        .then( cour => {
            allCouriers = cour;
            return Customer.findAll();
        })
        .then( cust => {
            if( !cust || cust.length == 0 ) {
                return Customer.bulkCreate([
                    { firstName: 'Harry', lastName:'Potter', street: "Wielka", city: "Warszawa", zipCode:"02-232", email: "harry@gmail.com"},
                    { firstName: 'Matt', lastName:'Morgan', street: "Mała", city: "Warszawa", zipCode:"02-232", email: "morgan@gmail.com"},
                    { firstName: 'Dan', lastName:'Law', street: "Medium", city: "Warszawa", zipCode:"02-232", email: "dan@gmail.com"},
                ])
                .then( () => {
                    return Courier.findAll();
                });
            } else {
                return cust;
            }
        })
        .then( cust => {
            allCustomers = cust;
            return Order.findAll();
        })
        .then( ord => {
            if( !ord || ord.length == 0 ) {
                return Order.bulkCreate([
                    {courier_id: allCouriers[0]._id, customer_id: allCustomers[0]._id, weight: 20, date: '2022-02-04', price: 100},
                    {courier_id: allCouriers[1]._id, customer_id: allCustomers[1]._id, weight: 40, date: '2022-03-01', price: 300},
                    {courier_id: allCouriers[1]._id, customer_id: allCustomers[2]._id, weight: 17, date: '2022-12-12', price: 25},
                    {courier_id: allCouriers[0]._id, customer_id: allCustomers[1]._id, weight: 32, date: '2022-07-02', price: 200},
                    {courier_id: allCouriers[2]._id, customer_id: allCustomers[2]._id, weight: 120, date: '2022-10-02', price: 79},
                    {courier_id: allCouriers[2]._id, customer_id: allCustomers[0]._id, weight: 52, date: null, price: 60}
                ]);
            } else {
                return ord;
            }
        });
};