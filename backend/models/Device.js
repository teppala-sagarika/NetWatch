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