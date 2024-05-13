const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static async register(req, res) {
    try {
      const { full_name, password, gender, email, role } = req.body;
      const newUser = await User.create({
        full_name,
        email,
        password,
        gender,
        role,
      });
      const formattedBalance = parseInt(newUser.balance).toLocaleString(
        "id-ID",
        {
          style: "currency",
          currency: "IDR",
        }
      );
      res.status(201).json({
        user: {
          id: newUser.id,
          full_name: newUser.full_name,
          email: newUser.email,
          gender: newUser.gender,
          balance: formattedBalance,
          createdAt: newUser.createdAt,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.errors[0].message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid email/password" });
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email/password" });
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.user.id;
      const { full_name, email } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (full_name) user.full_name = full_name;
      if (email) user.email = email;
      await user.save();

      return res.status(200).json({
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.errors[0].message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();

      return res.status(200).json({
        message: "Your account has been successfully deleted",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async topup(req, res) {
    try {
      const { balance } = req.body;
      if (balance <= 0) {
        return res.status(400).json({ message: "Invalid balance" });
      }
      const user = await User.findByPk(req.user.id);
      user.balance += parseInt(balance);
      await user.save();
      const formattedBalance = parseInt(user.balance).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return res.status(200).json({
        message: `Your balance has been successfully updated to ${formattedBalance}`,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = UserController;
