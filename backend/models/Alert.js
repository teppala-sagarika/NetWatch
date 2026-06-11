const mongoose = require("mongoose");

const alertSchema =
    new mongoose.Schema({

        deviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device"
        },

        deviceName: String,

        type: String,

        message: String,

        createdAt: {
            type: Date,
            default: Date.now
        }

    });

module.exports =
    mongoose.model(
        "Alert",
        alertSchema
    );