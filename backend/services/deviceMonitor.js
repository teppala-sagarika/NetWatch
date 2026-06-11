const axios = require("axios");

async function checkHost(host) {

    try {

        let url = host;

        if (!host.startsWith("http://") &&
            !host.startsWith("https://")
        ) {

            url = `https://${host}`;

        }

        const start =
            Date.now();

        await axios.get(
            url, {
                timeout: 5000
            }
        );

        const latency =
            Date.now() - start;

        return {

            status: "Online",

            latency

        };

    } catch {

        return {

            status: "Offline",

            latency: 0

        };

    }

}

module.exports = checkHost;