const mongoose = require("mongoose");

const monitorLogSchema =
    new mongoose.Schema({

        deviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device"
        },

        latency: Number,

        status: String,

        timestamp: {
            type: Date,
            default: Date.now
        }

    });

module.exports =
    mongoose.model(
        "MonitorLog",
        monitorLogSchema
    );