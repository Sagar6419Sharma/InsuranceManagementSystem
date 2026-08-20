const express = require("express");

const router = express.Router();

const {
    getReport
} = require("../controllers/reportController");

const verifyToken =
    require("../middleware/authMiddleware");

router.get(
    "/",
    verifyToken,
    getReport
);

module.exports = router;