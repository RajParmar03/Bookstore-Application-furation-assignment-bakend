const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    username : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    cart : {
        type : Array,
        require : true,
        default : [],
    }
});

const UserModel = mongoose.model("user" , userSchema);

module.exports = UserModel;