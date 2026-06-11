const ping = require("ping");

async function checkHost(host) {

    const result =
        await ping.promise.probe(host);

    return {
        status: result.alive ?
            "Online" :
            "Offline",

        latency: result.time === "unknown" ?
            0 :
            Number(result.time)
    };
}

module.exports = checkHost;