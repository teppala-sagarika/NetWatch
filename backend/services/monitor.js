const si = require("systeminformation");

async function getSystemMetrics() {

    const cpu = await si.currentLoad();

    const mem = await si.mem();

    const disk = await si.fsSize();

    const time = await si.time();

    return {
        cpu: cpu.currentLoad.toFixed(2),

        memory: (
            (mem.used / mem.total) *
            100
        ).toFixed(2),

        disk: disk[0] ?
            disk[0].use.toFixed(2) :
            0,

        uptime: time.uptime
    };
}

module.exports = getSystemMetrics;