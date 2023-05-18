const {TransactionHistory, Product, Category, User} = require('../models')

class TransactionController {
    static async createTransaction(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.user.id;
            const product = await Product.findByPk(productId, {
                include: Category,
            });
           
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            if (isNaN(parseInt(quantity))) {
                return res.status(400).json({ message: "Invalid quantity" });
            }
            if (parseInt(quantity) > product.stock) {
                return res.status(404).json({ message: "Product is out of stock" });
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
            if (totalprice > 0) {
                const category = await Category.findByPk(product.CategoryId);   
                category.sold_product_amount += parseInt(quantity);
                await category.save();
            }
            const newTransaction = await TransactionHistory.create({
                UserId: userId,
                ProductId: productId,
                quantity,
                total_price: totalprice,
            });
            const FormattedPrice = parseInt(totalprice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
            res.status(201).json({message: "You Have succesly purchase the product", 
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
            res.status(200).json({ transaction });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    static async getAllTransactionAdmin(req, res) {
        try {
            const transaction = await TransactionHistory.findAll({
                include: ["Product"],
                order: [["id", "ASC"]],
            });
            res.status(200).json({ transaction });
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
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            if (user.role === "customer" && transaction.UserId !== userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            res.status(200).json({ transaction });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


}

module.exports = TransactionController