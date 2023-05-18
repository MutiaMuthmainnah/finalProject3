const {TransactionHistory, Product, Category, User} = require('../models')

class TransactionController {
    static async createTransaction(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.user.id;
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            if (isNaN(parseInt(quantity))) {
                return res.status(400).json({ message: "Invalid quantity" });
            }
            if (product.stock - quantity < 5) {
                return res.status(404).json({ message: "Product is out of stock" });
            }
            if (product.stock < quantity) {
                return res.status(404).json({ message: "Not enough stock" });
            }
            const totalprice = product.price * parseInt(quantity);
            const user = await User.findByPk(userId);
            if (user.balance < totalprice) {
                return res.status(404).json({ message: "Your balance is not enough" });
            }
            product.stock -= parseInt(quantity);
            await product.save();
            user.balance -= parseInt(totalprice);
            await user.save();
            const category = await Category.findByPk(product.CategoryId);   
            category.sold_product_amount += parseInt(quantity);
            await category.save();
            const newTransaction = await TransactionHistory.create({
                UserId: userId,
                ProductId: productId,
                quantity,
                total_price: totalprice,
            });
            const FormattedPrice = parseInt(newTransaction.total_price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
            res.status(201).json({
                message: "You Have succesly purchase the product", 
                transactionBill: {
                    total_price: FormattedPrice,
                    quantity: newTransaction.quantity,
                    product_name: product.title,
                },
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }  
  
    static async getAllTransaction(req, res) {
        try {
            const userId = req.user.id;
            const transaction = await TransactionHistory.findAll({
                where: { UserId: userId },
                include: ["Product"],
                order: [["id", "ASC"]],
            });
            const formattedTransaction = transaction.map((transaction) => {
                const formattedPrice = parseInt(transaction.total_price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                });
                return {
                    ProductId: transaction.ProductId,
                    UserId: transaction.UserId,
                    quantity: transaction.quantity,
                    total_price: formattedPrice,
                    createdAt: transaction.createdAt,
                    updatedAt: transaction.updatedAt,
                    Product: {
                        id: transaction.Product.id,
                        title: transaction.Product.title,
                        price: parseInt(transaction.Product.price).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }),
                        stock: transaction.Product.stock,
                        CategoryId: transaction.Product.CategoryId,
                    }
                }
            });
            res.status(200).json({ transactionHistories: formattedTransaction });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    static async getAllTransactionAdmin(req, res) {
        try {
            const transactions = await TransactionHistory.findAll({
                include: [Product, User],
                order: [["id", "ASC"]],
            });
            const formattedTransactions = transactions.map((transaction) => {
                return {
                    ProductId: transaction.ProductId,
                    UserId: transaction.UserId,
                    quantity: transaction.quantity,
                    total_price: parseInt(transaction.total_price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }),
                    createdAt: transaction.createdAt,
                    updatedAt: transaction.updatedAt,
                    Product: {
                        id: transaction.Product.id,
                        title: transaction.Product.title,
                        price: parseInt(transaction.Product.price).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }),
                        stock: transaction.Product.stock,
                        CategoryId: transaction.Product.CategoryId,
                    },
                    User: {
                        id: transaction.User.id,
                        email: transaction.User.email,
                        balance: parseInt(transaction.User.balance).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }),
                        gender: transaction.User.gender,
                        role: transaction.User.role,
                    },
                };
            });
            res.status(200).json({ transactionHistories: formattedTransactions });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    static async getTransactionbyId(req, res) {
        try {
            const { transactionId } = req.params;
            const transaction = await TransactionHistory.findByPk(transactionId, {
                include: ["Product"],
            });
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            if (req.user.role === "customer" && transaction.UserId !== req.user.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const formattedTransaction = {
                ProductId: transaction.ProductId,
                UserId: transaction.UserId,
                quantity: transaction.quantity,
                total_price: parseInt(transaction.total_price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }),
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt,
                Product: {
                    id: transaction.Product.id,
                    title: transaction.Product.title,
                    price: parseInt(transaction.Product.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }),
                    stock: transaction.Product.stock,
                    CategoryId: transaction.Product.CategoryId,
                },
            };
            res.status(200).json({ formattedTransaction });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


}

module.exports = TransactionController