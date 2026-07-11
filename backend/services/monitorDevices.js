const checkHost = require("./deviceMonitor");

const Device = require("../models/Device");
const MonitorLog = require("../models/MonitorLog");
const Alert = require("../models/Alert");

async function monitorDevices(io) {

    try {

        const devices =
            await Device.find();

        const userResults = {};

        for (const device of devices) {

            const pingData =
                await checkHost(device.host);

            console.log(
                device.name,
                pingData
            );

            // ==========================
            // Save Monitor Log
            // ==========================

            await MonitorLog.create({

                userId: device.userId,

                deviceId: device._id,

                latency: pingData.latency,

                status: pingData.status

            });

            // ==========================
            // OFFLINE ALERT
            // ==========================

            if (pingData.status === "Offline") {

                const existing =
                    await Alert.findOne({

                        userId: device.userId,

                        deviceId: device._id,

                        type: "OFFLINE"

                    });

                if (!existing) {

                    await Alert.create({

                        userId: device.userId,

                        deviceId: device._id,

                        deviceName: device.name,

                        type: "OFFLINE",

                        message: `${device.name} is offline`

                    });

                }

            } else {

                await Alert.deleteMany({

                    userId: device.userId,

                    deviceId: device._id,

                    type: "OFFLINE"

                });

            }

            // ==========================
            // HIGH LATENCY ALERT
            // ==========================

            if (pingData.latency > 300) {

                const existing =
                    await Alert.findOne({

                        userId: device.userId,

                        deviceId: device._id,

                        type: "HIGH_LATENCY"

                    });

                if (!existing) {

                    await Alert.create({

                        userId: device.userId,

                        deviceId: device._id,

                        deviceName: device.name,

                        type: "HIGH_LATENCY",

                        message: `${device.name} latency is ${pingData.latency} ms`

                    });

                }

            } else {

                await Alert.deleteMany({

                    userId: device.userId,

                    deviceId: device._id,

                    type: "HIGH_LATENCY"

                });

            }

            // ==========================
            // Group Devices by User
            // ==========================

            const uid =
                device.userId.toString();

            if (!userResults[uid]) {

                userResults[uid] = [];

            }

            userResults[uid].push({

                _id: device._id,

                name: device.name,

                host: device.host,

                status: pingData.status,

                latency: pingData.latency

            });

        }

        // ==========================
        // Emit ONLY that user's devices
        // ==========================

        for (const userId in userResults) {

            io.to(userId).emit(

                "deviceUpdated",

                userResults[userId]

            );

            const alerts =
                await Alert.find({

                    userId

                })

            .sort({

                createdAt: -1

            });

            io.to(userId).emit(

                "alertsUpdated",

                alerts

            );

        }

    } catch (err) {

        console.error(

            "monitorDevices:",

            err

        );

    }

}

module.exports =
    monitorDevices;