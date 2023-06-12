const mongoose = require("mongoose")

const assetsSchema = new mongoose.Schema({
    product: {
        type: String
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    assignto_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"users"

    },
    status: {
        type: String,
    },
    expirationDate: {
        type:Date
    },
    condition: {
        type:String
    }
}, { timestamps: true });

const Assets = mongoose.model('Assets', assetsSchema);

module.exports = Assets;