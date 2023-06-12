const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type: String

    },
    phone:{
        type: String

    }
},{timestamps:true});

const User = mongoose.model('users', userSchema);

module.exports = User;