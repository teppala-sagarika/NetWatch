const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Device = require("../models/Device");
const MonitorLog = require("../models/MonitorLog");
const Alert = require("../models/Alert");

const checkHost =
    require("../services/deviceMonitor");



// ======================================================
// GET ALL SERVICES OF LOGGED IN USER
// ======================================================

router.get("/", auth, async(req, res) => {

    try {

        const devices = await Device.find({

            userId: req.user.id

        });

        const results = await Promise.all(

            devices.map(async(device) => {

                const latestLog =
                    await MonitorLog.findOne({

                        deviceId: device._id,

                        userId: req.user.id

                    })

                .sort({

                    timestamp: -1

                });

                return {

                    _id: device._id,

                    name: device.name,

                    host: device.host,

                    status: latestLog ? latestLog.status : "Unknown",
                    latency: latestLog ? latestLog.latency : 0,

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



// ======================================================
// ADD SERVICE
// ======================================================

router.post("/", auth, async(req, res) => {

    try {

        let {

            name,

            host

        } = req.body;

        name = name.trim();

        host = host.trim().toLowerCase();



        // -----------------------------
        // Validate Name
        // -----------------------------

        if (!name) {

            return res.status(400).json({

                message:

                    "Service name is required."

            });

        }



        // -----------------------------
        // Validate URL
        // -----------------------------

        const regex =

            /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

        if (!regex.test(host)) {

            return res.status(400).json({

                message:

                    "Please enter a valid website."

            });

        }



        // -----------------------------
        // Normalize URL
        // -----------------------------

        if (

            !host.startsWith("http://") &&

            !host.startsWith("https://")

        ) {

            host =

                `https://${host}`;

        }

        host =

            host.replace(/\/$/, "");



        // -----------------------------
        // Duplicate Check
        // -----------------------------

        const exists =

            await Device.findOne({

                userId: req.user.id,

                host

            });

        if (exists) {

            return res.status(400).json({

                message:

                    "This service is already being monitored."

            });

        }



        // -----------------------------
        // Create Service
        // -----------------------------

        const device =

            await Device.create({

                name,

                host,

                userId:

                    req.user.id

            });

        res.status(201).json(device);

    } catch (error) {

        res.status(500).json({

            error:

                error.message

        });

    }

});



// ======================================================
// DELETE SERVICE
// ======================================================

router.delete("/:id", auth, async(req, res) => {

    try {

        const device =

            await Device.findOne({

                _id: req.params.id,

                userId: req.user.id

            });

        if (!device) {

            return res.status(404).json({

                message:

                    "Service not found."

            });

        }



        await Device.findByIdAndDelete(

            device._id

        );



        await MonitorLog.deleteMany({

            deviceId: device._id,

            userId: req.user.id

        });



        await Alert.deleteMany({

            deviceId: device._id,

            userId: req.user.id

        });



        res.json({

            message:

                "Service deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            error:

                error.message

        });

    }

});
// ======================================================
// SERVICE AVAILABILITY
// ======================================================

router.get("/:id/availability", auth, async(req, res) => {

    try {

        const logs = await MonitorLog.find({

            deviceId: req.params.id,

            userId: req.user.id

        });

        if (logs.length === 0) {

            return res.json({

                availability: 0

            });

        }

        const onlineLogs = logs.filter(

            log =>

            log.status === "Online"

        ).length;

        const availability = (

            onlineLogs /

            logs.length

        ) * 100;

        res.json({

            availability:

                availability.toFixed(2)

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});



// ======================================================
// SERVICE HISTORY
// ======================================================

router.get("/:id/history", auth, async(req, res) => {

    try {

        const logs = await MonitorLog.find({

            deviceId: req.params.id,

            userId: req.user.id

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



// ======================================================
// SERVICE DETAILS
// ======================================================

router.get("/:id", auth, async(req, res) => {

    try {

        const device = await Device.findOne({

            _id: req.params.id,

            userId: req.user.id

        });

        if (!device) {

            return res.status(404).json({

                message: "Service not found."

            });

        }

        const pingData = await checkHost(

            device.host

        );

        const logs = await MonitorLog.find({

            deviceId: device._id,

            userId: req.user.id

        });

        const averageLatency = logs.length

            ?
            Math.round(

                logs.reduce(

                    (sum, log) =>

                    sum + log.latency,

                    0

                ) / logs.length

            )

        : pingData.latency;

        const maxLatency = logs.length

            ?
            Math.max(

                ...logs.map(

                    log => log.latency

                )

            )

        : pingData.latency;

        const onlineLogs = logs.filter(

            log =>

            log.status === "Online"

        ).length;

        const uptime = logs.length

            ?
            (

                (onlineLogs /

                    logs.length) *

                100

            ).toFixed(2)

        : "100.00";

        res.json({

            _id: device._id,

            name: device.name,

            host: device.host,

            status: pingData.status,

            statusCode:

                pingData.statusCode,

            currentLatency:

                pingData.latency,

            averageLatency,

            maxLatency,

            uptime

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});



module.exports = router;