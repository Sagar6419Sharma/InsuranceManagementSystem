const express = require("express");

const router = express.Router();

const {
    createInsurance,
    getAllInsurance,
    getSingleInsurance,
    updateInsurance,
    deleteInsurance,
    searchInsurance
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


// SEARCH BY ID / NAME / PHONE / EMAIL

router.get(
    "/search/:value",
    verifyToken,
    searchInsurance
);


// GET SINGLE BY ID

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


module.exports = router;