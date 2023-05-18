'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models,Category);
      this.belongsTo(models.Product);
      this.belongsTo(models.TransactionHistory);
    }
  }
  User.init({
    full_name: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full Name cannot be empty",
          },
        },
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: {
          msg: "Email cannot be empty",
        },
      },
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        min : 6,
        max : 10,
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    gender: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn : [['male', 'female']],
        notEmpty: {
          msg: "Gender cannot be empty",
        },
      },
    },
    role: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn : [['admin', 'customer']],
        notEmpty: {
          msg: "Role cannot be empty",
        },
      },
    },
    balance: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        min : 0,
        max : 100000000,
        notEmpty: {
          msg: "Balance cannot be empty",
        },
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};