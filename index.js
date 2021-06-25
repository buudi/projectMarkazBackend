require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = 8080;

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
}

app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});

const mountRoutes = require("./routes/index");
mountRoutes(app)

app.get("/", (req, res) => {
    res.send("Welcome to Markaz Alhuda API");
});

app.listen(port, () => console.log(`listening on port ${port}`));