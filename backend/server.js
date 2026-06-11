const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const metricsRoute =
    require("./routes/metrics");

const deviceRoutes =
    require("./routes/devices");
require("dotenv").config();

const getSystemMetrics =
    require("./services/monitor");

const alertRoutes =
    require("./routes/alerts");

const app = express();

const server =
    http.createServer(app);

const io =
    new Server(server, {

        cors: {

            origin: [

                "http://localhost:5173",

                "https://net-watch-two.vercel.app"

            ],

            methods: [
                "GET",
                "POST"
            ]

        }

    });

app.use(
    cors({

        origin: [

            "http://localhost:5173",

            "https://net-watch-two.vercel.app"

        ]

    })
);
app.use(express.json());

app.use(
    "/api/metrics",
    metricsRoute
);

app.use(
    "/api/devices",
    deviceRoutes
);

app.use(
    "/api/alerts",
    alertRoutes
);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>
        console.log("Mongo Connected")
    );

io.on("connection", socket => {

    console.log(
        "Client Connected"
    );

    const interval =
        setInterval(async() => {

            const metrics =
                await getSystemMetrics();

            socket.emit(
                "metrics",
                metrics
            );

        }, 3000);

    socket.on(
        "disconnect",
        () => {

            clearInterval(interval);

            console.log(
                "Client Disconnected"
            );

        }
    );

});

const PORT =
    process.env.PORT || 5000;

server.listen(
    PORT,
    () =>
    console.log(
        `Server Running on ${PORT}`
    )
);