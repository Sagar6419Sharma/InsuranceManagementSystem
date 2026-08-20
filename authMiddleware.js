const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    console.log(req.headers);

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            message: "No Token Provided"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;