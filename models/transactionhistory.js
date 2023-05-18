'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models,Product);
      this.belongsTo(models,User);
    }
  }
  TransactionHistory.init({
    quantity: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          isInt: true,
          notEmpty: {
            msg: "Quantity cannot be empty",
          },
        },
    },
    total_price: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          isInt: true,
          notEmpty: {
            msg: "Total Price cannot be empty",
          },
        },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};