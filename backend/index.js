const express = require("express");
const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("hello social media app");
});

const userRoutes = require('./routes/user.route.js');
app.use('/users', userRoutes);

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then((r) => {
        console.log("mongoDb Connected");
    })
    .catch((err) => {
        console.log(err);
    });

const db = mongoose.connection;

db.on("error" , console.error.bind(console, "connection error :"));
db.once("open", function(){
    console.log("database connected seccessfully ...")
})

app.listen(process.env.PORT, () => {
    console.log("app listing on port ${process.env.PORT}");
});
