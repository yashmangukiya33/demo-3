const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    total: {
        type:Number
    }


}, { timestamps: true });

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;