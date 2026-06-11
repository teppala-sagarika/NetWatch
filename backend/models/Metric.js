const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
    cpu: Number,
    memory: Number,
    disk: Number,
    uptime: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Metric", metricSchema);