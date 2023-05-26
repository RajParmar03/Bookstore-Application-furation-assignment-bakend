const express = require("express");
const cors = require("cors");

const connection  = require("./config/db");
const bookRouter = require("./controllers/book.route"); 

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/" , (req , res) => {
    res.status(200).send({msg : "success" , data : "you are on the raj parmar assignment backend."});
});

app.use("/books" , bookRouter);

app.listen(port , async() => {
    try {
        await connection;
        console.log("successfully connected to DB...");
    } catch (error) {
        console.log("failed to connect to DB...");
    }
    console.log(`server is successfully running...`); 
});