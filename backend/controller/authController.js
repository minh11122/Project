const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema ");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: username }, { phone: username }]
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json({ message: "Đăng nhập thành công", token });

        } else {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi đăng nhập" });
    }
};

const loginWithGoogle = async (req, res) => {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({ email, name });
    }

    return res.status(200).json({ message: "Login successful", user });
};

module.exports = {
    login,
    loginWithGoogle
};