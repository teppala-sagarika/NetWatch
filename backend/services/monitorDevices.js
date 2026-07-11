const checkHost = require("./deviceMonitor");

const Device = require("../models/Device");
const MonitorLog = require("../models/MonitorLog");
const Alert = require("../models/Alert");

async function monitorDevices(io) {
    try {
        const devices = await Device.find();

        const results = await Promise.all(

            devices.map(async(device) => {

                const pingData =
                    await checkHost(device.host);

                console.log(
                    device.name,
                    pingData
                );

                await MonitorLog.create({

                    deviceId: device._id,

                    latency: pingData.latency,

                    status: pingData.status

                });

                if (pingData.status === "Offline") {

                    const existingAlert =
                        await Alert.findOne({

                            deviceId: device._id,

                            type: "OFFLINE"

                        });

                    if (!existingAlert) {

                        await Alert.create({

                            deviceId: device._id,

                            deviceName: device.name,

                            type: "OFFLINE",

                            message: `${device.name} is offline`

                        });

                    }

                } else {

                    await Alert.deleteMany({

                        deviceId: device._id,

                        type: "OFFLINE"

                    });

                }

                if (pingData.latency > 300) {

                    await Alert.create({

                        deviceId: device._id,

                        deviceName: device.name,

                        type: "HIGH_LATENCY",

                        message: `${device.name} latency is ${pingData.latency} ms`

                    });

                }

                return {

                    _id: device._id,

                    name: device.name,

                    host: device.host,

                    status: pingData.status,

                    latency: pingData.latency

                };

            })

        );
        console.log("Emitting deviceUpdated");
        console.log(results);
        io.emit(

            "deviceUpdated",

            results

        );
        const alerts =
            await Alert.find()
            .sort({
                createdAt: -1
            });

        io.emit(
            "alertsUpdated",
            alerts
        );
    } catch (err) {
        console.error("monitorDevices:", err);
    }
}

module.exports = monitorDevices;