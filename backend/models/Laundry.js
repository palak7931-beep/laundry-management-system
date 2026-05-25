const mongoose = require("mongoose")

const laundrySchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: true
    },

    roomNumber: {
        type: String,
        required: true
    },

    shirts: Number,

    pants: Number,

    towels: Number,

    socks: Number,

    bedsheets: Number,

    collectionDate: String,

    status: {
        type: String,
        default: "Collected"
    },

    depositAmount: {
    type: Number,
    default: 0
},

deductedAmount: {
    type: Number,
    default: 0
},

remainingBalance: {
    type: Number,
    default: 0
}

})

module.exports = mongoose.model("Laundry", laundrySchema)