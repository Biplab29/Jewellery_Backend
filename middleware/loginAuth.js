const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const checkLogin = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Token Not Found" });
    }

    try {
       jwt.verify(token, process.env.secretKey);    
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token is Expired or Invalid" });
    }
};

module.exports = checkLogin;

console.log("Middleware is Working...");
