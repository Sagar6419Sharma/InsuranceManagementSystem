const db = require("../config/db");

exports.getReport = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS totalPolicies,
            SUM(premium) AS totalPremium,
            SUM(coverage_amount) AS totalCoverage
        FROM insurance
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};
