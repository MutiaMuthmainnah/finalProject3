const { Category } = require("../models");

class CategoryController {
  static async createCategory(req, res) {
    try {
      const { type } = req.body;
      const newCategory = await Category.create({
        type,
      });
      res.status(201).json({
        category: {
          id: newCategory.id,
          type: newCategory.type,
          createdAt: newCategory.createdAt,
          updatedAt: newCategory.updatedAt,
          sold_product_amount: newCategory.sold_product_amount,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({
        include: ["Products"],
        order: [["id", "ASC"]],
      });
      res.status(200).json({ categories });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async editCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const { type } = req.body;
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      if (type) category.type = type;
      await category.save();
      res.status(200).json({ category });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      await category.destroy();
      res
        .status(200)
        .json({ message: "Category has been successfully deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = CategoryController;
