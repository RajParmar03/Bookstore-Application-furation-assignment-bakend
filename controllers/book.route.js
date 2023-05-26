const express = require("express");
const BookModel = require("../models/book.model");

const bookRouter = express.Router();

bookRouter.get("/" , async (req , res) => {
    try {
        const books = await BookModel.find();
        res.status(200).send({msg : "success" , data : books});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "failed" , data : []});
    }
});

bookRouter.get("/book/:id" , async (req , res) => {
    const id = req.params.id;
    try {
        const book = await BookModel.find({_id : id});
        res.status(200).send({msg : "success" , data : book});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "failed" , data : []});
    }
});

bookRouter.get("/search" , async (req , res) => {
    const searchQuery = req.query.search;
    try {
        const books = await BookModel.find();
        const newBooks = books.filter((elem) => {
            return elem.title.includes(searchQuery) || elem.author.includes(searchQuery) || elem.genre.includes(searchQuery);
        });
        res.status(200).send({msg : "success" , data : newBooks});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "failed" , data : []});
    }
});

bookRouter.get("/filter" , async (req , res) => {
    const filterQuery = req.query.filter;
    try {
        const books = await BookModel.find({genre : filterQuery});
        res.status(200).send({msg : "success" , data : books});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "failed" , data : []});
    }
})


module.exports = bookRouter;