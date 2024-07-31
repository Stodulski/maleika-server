const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.login = async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        const user = await User.findOne({ usuario });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(
            contraseña,
            user.contraseña
        );
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET);
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Failed to authenticate token" });
        }
        req.userId = decoded.userId;
        next();
    });
};
