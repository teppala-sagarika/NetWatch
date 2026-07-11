const mongoose = require("mongoose");

const monitorLogSchema =
    new mongoose.Schema({

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        deviceId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Device",

            required: true

        },

        latency: {

            type: Number,

            required: true

        },

        status: {

            type: String,

            required: true

        },

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