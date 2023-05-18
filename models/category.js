'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models,Product);
    }
  }
  Category.init({
    type: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: {
            msg: "Type cannot be empty",
          },
        },
    },
    sold_product_amount: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          isInt: true,
          notEmpty: {
            msg: "Cannot be empty",
          },
        },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};