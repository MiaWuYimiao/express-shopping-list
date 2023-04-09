
const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const itemRoutes = require("./routes/itemRoutes");

app.use(express.json());

app.use("/items", itemRoutes);

app.use(function(req, res) {
    return new ExpressError("Not Found", 404);
});

app.use(function(err, req, res, next) {
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});

module.exports = app;