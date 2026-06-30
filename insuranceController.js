const db = require("../config/db");


// CREATE

exports.createInsurance = (req, res) => {

    const {
        first_name,
        last_name,
        phone,
        email,
        policy_name,
        policy_type,
        premium,
        coverage_amount
    } = req.body;

    const sql = `
        INSERT INTO insurance
        (
            first_name,
            last_name,
            phone,
            email,
            policy_name,
            policy_type,
            premium,
            coverage_amount
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            first_name,
            last_name,
            phone,
            email,
            policy_name,
            policy_type,
            premium,
            coverage_amount
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Insurance Added Successfully"
            });

        }
    );

};


// GET ALL

exports.getAllInsurance = (req, res) => {

    db.query(
        "SELECT * FROM insurance",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};


// GET SINGLE

exports.getSingleInsurance = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM insurance WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "Insurance Not Found"
                });

            }

            res.json(result[0]);

        }
    );

};


// UPDATE

exports.updateInsurance = (req, res) => {

    const { id } = req.params;

    const {
        first_name,
        last_name,
        phone,
        email,
        policy_name,
        policy_type,
        premium,
        coverage_amount
    } = req.body;

    const sql = `
        UPDATE insurance
        SET
            first_name = ?,
            last_name = ?,
            phone = ?,
            email = ?,
            policy_name = ?,
            policy_type = ?,
            premium = ?,
            coverage_amount = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            first_name,
            last_name,
            phone,
            email,
            policy_name,
            policy_type,
            premium,
            coverage_amount,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Insurance Updated Successfully"
            });

        }
    );

};


// DELETE

exports.deleteInsurance = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM insurance WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Insurance Deleted Successfully"
            });

        }
    );

};