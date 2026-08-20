const express = require("express");

const router = express.Router();

const {
    createInsurance,
    getAllInsurance,
    getSingleInsurance,
    updateInsurance,
    deleteInsurance
} = require("../controllers/insuranceController");

const verifyToken =
    require("../middleware/authMiddleware");

const checkAdmin =
    require("../middleware/roleMiddleware");


// CREATE

router.post(
    "/",
    verifyToken,
    checkAdmin,
    createInsurance
);


// GET ALL


router.get(
    "/",
    verifyToken,
    getAllInsurance
);


// GET SINGLE

router.get(
    "/:id",
    verifyToken,
    getSingleInsurance
);


// UPDATE

router.put(
    "/:id",
    verifyToken,
    checkAdmin,
    updateInsurance
);


// DELETE

router.delete(

    "/:id",
    verifyToken,
    checkAdmin,
    deleteInsurance
);
// GET SINGLE INSURANCE

exports.getSingleInsurance = (req, res) => {

```
const { id } = req.params;

db.query(
    "SELECT * FROM insurance WHERE id = ?",
    [id],
    (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.json({
                message: "Customer Not Found"
            });

        }

        res.json(result[0]);

    }
);
```

};



module.exports = router;