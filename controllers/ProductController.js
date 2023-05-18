const { Product } = require("../models");

class ProductController {
    static async createProduct(req, res) {
        try {
            const { title, price, stock, CategoryId } = req.body;
            const newProduct = await Product.create({
                title,
                price,
                stock,
                CategoryId,
            });
            res.status(201).json({Product: newProduct});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    //create a function getAllProducts
    static async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: ["Category"],
                order: [["id", "ASC"]],
            });
            res.status(200).json({ products });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    //create a function for getProducts by id
    static async getProductsbyId(req, res) {
        try {
            const { productId } = req.params;
            const product = await Product.findByPk(productId, {
                include: ["Category"],
            });
            res.status(200).json({ product });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    //create a function for edit "title,price,stock" by id
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
            res.status(200).json({ product });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    //create a function for edit "CategoryId" by id
    static async editCategoryId(req, res) {
        try {
            const { productId } = req.params;
            const { CategoryId } = req.body;
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: "Category not found" });
            }
            if (CategoryId) product.CategoryId = CategoryId;
            await product.save();
            res.status(200).json({ product });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    //create a function for delete Products by id
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