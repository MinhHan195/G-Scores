require('dotenv').config();
const express = require("express");
const cors = require("cors");
const scoresRouter = require("./app/routers/scores.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors({
    origin: process.env.URL_FRONTEND,
    credentials: true,
}));
app.use(express.json());

app.use("/api/scores", scoresRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        errors: error.errors || "Internal Server Error",
    });
});


module.exports = app;