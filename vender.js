const mongoose = require("mongoose")

const venderSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, { timestamps: true });

const Vender = mongoose.model('Vender', venderSchema);

module.exports = Vender ;