const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");

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

const register = async (req, res) => {
    try {
        const { email, phone, fullName, password, confirmPassword } = req.body;
        
        if (!email || !phone || !fullName || !password || !confirmPassword) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Mật khẩu và xác nhận mật khẩu không khớp" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email hoặc số điện thoại đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            phone,
            fullname: fullName,
            password: hashedPassword,
            picture: ""
        });

        return res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        return res.status(500).json({ message: "Đăng ký thất bại" });
    }
};

module.exports = {
    login,
    register
};