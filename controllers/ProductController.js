const { Product, Category } = require("../models");

class ProductController {
  static async createProduct(req, res) {
    try {
      const { title, price, stock, CategoryId } = req.body;
      const category = await Category.findByPk(CategoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      const newProduct = await Product.create({
        title,
        price,
        stock,
        CategoryId,
      });
      const formattedPrice = newProduct.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      res.status(201).json({
        product: {
          id: newProduct.id,
          title: newProduct.title,
          price: formattedPrice,
          stock: newProduct.stock,
          CategoryId: newProduct.CategoryId,
          updatedAt: newProduct.updatedAt,
          createdAt: newProduct.createdAt,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: ["Category"],
        order: [["id", "ASC"]],
      });
      const formattedProducts = products.map((product) => {
        const formattedPrice = product.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        return {
          id: product.id,
          title: product.title,
          price: formattedPrice,
          stock: product.stock,
          CategoryId: product.CategoryId,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          Category: product.Category,
        };
      });
      res.status(200).json({ products: formattedProducts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductsbyId(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId, {
        include: ["Category"],
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const formattedPrice = product.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      res.status(200).json({
        product: {
          id: product.id,
          title: product.title,
          price: formattedPrice,
          stock: product.stock,
          CategoryId: product.CategoryId,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          Category: product.Category,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async editProduct(req, res) {
    try {
      const { productId } = req.params;
      const { title, price, stock } = req.body;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (title) product.title = title;
      if (price) product.price = price;
      if (stock) product.stock = stock;
      await product.save();
      const formattedPrice = product.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      res.status(200).json({
        product: {
          id: product.id,
          title: product.title,
          price: formattedPrice,
          stock: product.stock,
          CategoryId: product.CategoryId,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static async editCategoryId(req, res) {
    try {
      const { productId } = req.params;
      const { CategoryId } = req.body;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Category not found" });
      }
      const category = await Category.findByPk(CategoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      product.CategoryId = parseInt(CategoryId);
      await product.save();
      const formattedPrice = product.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      res.status(200).json({
        product: {
          id: product.id,
          title: product.title,
          price: formattedPrice,
          stock: product.stock,
          CategoryId: product.CategoryId,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await product.destroy();
      res
        .status(200)
        .json({ message: "Product has been successfully deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ProductController;
