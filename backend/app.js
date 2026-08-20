require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const insuranceRoutes =
    require("./routes/insuranceRoutes");

const reportRoutes =
    require("./routes/reportRoutes");


const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/insurance", insuranceRoutes);

app.use("/api/reports", reportRoutes);


// Home Route
app.get("/", (req, res) => {

    res.send(
        "Insurance Management System API Running"
    );

});


// Server Start
app.listen(process.env.PORT, () => {

    console.log(
        `Server Running On Port ${process.env.PORT}`
    );

});