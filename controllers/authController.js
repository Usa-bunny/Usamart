const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const handleError = require('../utils/handleError');

const authController = {
    getRegister: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            const { name, email, username, password } = req.body;

            if (!name || !email || !username || !password) {
                return handleError(res, 400, "Semua field wajib diisi!");
            }

            const existingUser = await User.findOne({ "account.username": username });
            if (existingUser) {
                return handleError(res, 400, "Username sudah digunakan!");
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return handleError(res, 400, "Email sudah terdaftar!");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                account: {
                    username,
                    password: hashedPassword,
                    role: 'user'
                }
            });

            await newUser.save();
            res.redirect('/auth/login');
        } catch (error) {
            console.error(error);
            return handleError(res, 500, error.message);
        }
    },

    getLogin: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ "account.username": username });
            if (!user) {
                return handleError(res, 400, "Username tidak ditemukan!");
            }

            const validPassword = await bcrypt.compare(password, user.account.password);
            if (!validPassword) {
                return handleError(res, 400, "Password salah!");
            }

            req.session.user = {
                _id: user._id,
                username: user.account.username,
                role: user.account.role
            };

            if (user.account.role === 'admin') {
                res.redirect('');
            } else {
                res.redirect('/usamart/item');
            }
        } catch (error) {
            console.error(error);
            return handleError(res, 500, "Login gagal!");
        }
    },
};

module.exports = authController;
