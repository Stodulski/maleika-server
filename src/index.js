const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/routes");
const authRoutes = require('./routes/authRoutes')

const app = express();

const connectDB = require("./db");

connectDB();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", routes);
app.use("/api", authRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});
