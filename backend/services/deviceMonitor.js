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

        const response =
            await axios.get(

                url,

                {

                    timeout: 5000,

                    maxRedirects: 5,

                    validateStatus: () => true,

                    headers: {

                        "User-Agent": "NetWatch/1.0"

                    }

                }

            );

        const latency =
            Date.now() - start;

        let status = "Online";

        if (response.status >= 500) {

            status = "Server Error";

        }

        return {

            status,

            latency,

            statusCode: response.status

        };

    } catch (error) {

        if (

            error.code === "ECONNABORTED" ||

            error.code === "ENOTFOUND" ||

            error.code === "ECONNREFUSED"

        ) {

            return {

                status: "Offline",

                latency: 0,

                statusCode: null

            };

        }

        return {

            status: "Offline",

            latency: 0,

            statusCode: null

        };

    }

}

module.exports =
    checkHost;