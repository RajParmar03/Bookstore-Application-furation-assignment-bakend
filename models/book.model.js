const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    poster : {
        type : String,
        require : true,
    },
    title : {
        type : String,
        require : true,
    },
    price : {
        type : Number,
        require : true,
    },
    genre : {
        type : String,
        require : true,
    },
    Author : {
        type : String,
        require : true,  
    },
});

const BookModel = mongoose.model("book",bookSchema);

module.exports = BookModel;