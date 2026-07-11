const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    host: {
        type: String,
        required: true
    },

    userId: {

        type:

            mongoose.Schema.Types.ObjectId,

        ref:

            "User",

        required:

            true

    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports =
    mongoose.model(
        "Device",
        deviceSchema
    );