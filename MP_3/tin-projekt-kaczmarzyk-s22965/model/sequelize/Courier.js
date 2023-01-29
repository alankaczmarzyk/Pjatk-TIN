const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const Roles = require('../../middleware/constans')
const bcrypt = require('bcryptjs')

const Courier = sequelize.define('Courier', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2, 60],
                msg: "len_2_60"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2, 60],
                msg: "len_2_60"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isEmail: {
                msg: "isEmail"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        enum: Object.keys(Roles),
        default: Roles.User,
        allowNull: false
    },
},

{
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          user.dataValues.password = bcrypt.hashSync(user.password, 10);
        }
      },
      beforeUpdate: (user) => {
        if (user.password) {
          user.dataValues.password = bcrypt.hashSync(user.password, 10);
        }
      },
      beforeBulkCreate: (users) => {
        users.forEach((user) => {
          user.dataValues.password = bcrypt.hashSync(user.password, 10);
        });
      },
    },
  }



);

module.exports = Courier;

