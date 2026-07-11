const express = require("express");
const router = express.Router();

const checkHost =
    require("../services/deviceMonitor");

const Device =
    require("../models/Device");

const MonitorLog =
    require("../models/MonitorLog");

const Alert =
    require("../models/Alert");

const auth =
    require("../middleware/auth");

router.get("/", async(req, res) => {

    try {

        const devices =
            await Device.find();

        const results =
            await Promise.all(

                devices.map(async(device) => {

                    const latestLog =
                        await MonitorLog.findOne({

                            deviceId: device._id

                        })
                        .sort({

                            timestamp: -1

                        });

                    return {

                        _id: device._id,

                        name: device.name,

                        host: device.host,

                        status: latestLog ?
                            latestLog.status :
                            "Unknown",

                        latency: latestLog ?
                            latestLog.latency :
                            0

                    };

                })

            );

        res.json(results);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});

router.post("/", async(req, res) => {

    try {
        const { name, host } =
        req.body;

        const device =
            await Device.create({

                name,

                host

            });

        res.json(device);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.delete("/:id", async(req, res) => {

    try {

        await Device.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Device Deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get(
    "/:id/availability",
    async(req, res) => {

        try {

            const logs =
                await MonitorLog.find({

                    deviceId: req.params.id

                });

            if (
                logs.length === 0
            ) {

                return res.json({
                    availability: 0
                });

            }

            const onlineLogs =
                logs.filter(
                    log =>
                    log.status ===
                    "Online"
                ).length;

            const availability =

                (
                    onlineLogs /
                    logs.length
                ) * 100;

            res.json({

                availability: availability
                    .toFixed(2)

            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);
router.get(
    "/:id/history",
    async(req, res) => {

        try {

            const logs =
                await MonitorLog.find({

                    deviceId: req.params.id

                })
                .sort({
                    timestamp: -1
                })
                .limit(20);

            res.json(logs);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    });

router.get("/:id", async(req, res) => {

    try {

        const device =
            await Device.findById(
                req.params.id
            );

        if (!device) {

            return res
                .status(404)
                .json({
                    message: "Device not found"
                });

        }

        const pingData =
            await checkHost(
                device.host
            );

        res.json({

            _id: device._id,

            name: device.name,

            host: device.host,

            status: pingData.status,

            currentLatency: pingData.latency,

            averageLatency: pingData.latency,

            maxLatency: pingData.latency,

            uptime: "99.9%"

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
module.exports = router;