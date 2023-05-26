const express = require("express");
const cors = require("cors");

const { connection } = require("mongoose");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port , async() => {
    try {
        await connection;
        console.log("successfully connected to DB...");
    } catch (error) {
        console.log("failed to connect to DB...");
    }
    console.log("server is successfully running...");
});