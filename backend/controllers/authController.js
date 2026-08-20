const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER

exports.registerUser = async (req, res) => {

    const { name, email, password, role } = req.body;

    try {

        // Password ko hash karna
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)";

        db.query(
            sql,
            [name, email, hashedPassword, role || "user"],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "User Registered Successfully"
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};



// LOGIN USER

exports.loginUser = (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(400).json({
                message: "User Not Found"
            });

        }

        const user = result[0];

        // Password check
        const isMatch =
            await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        // JWT Token
        const token = jwt.sign(

            {
                id: user.id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            message: "Login Successful",

            token,

            role: user.role

        });

    });

};