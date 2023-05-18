'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models,Category);
    }
  }
  Product.init({
    title: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
    },
    price: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          isInt: true,
          min: 0,
          max: 50000000,
          notEmpty: {
            msg: "Price cannot be empty",
          },
        },
    },
    stock: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          isInt: true,
          min: 5,
          notEmpty: {
            msg: "Stock cannot be empty",
          },
        },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};