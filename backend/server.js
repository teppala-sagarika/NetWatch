const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes =
    require("./routes/auth");
const metricsRoute =
    require("./routes/metrics");

const deviceRoutes =
    require("./routes/devices");
require("dotenv").config();

console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

const getSystemMetrics =
    require("./services/monitor");

const alertRoutes =
    require("./routes/alerts");

const monitorDevices =
    require("./services/monitorDevices");

const app = express();

const server =
    http.createServer(app);

const jwt = require("jsonwebtoken");

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
app.use(
    "/api/auth",
    authRoutes
);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("Mongo Connected");

        let monitoring = false;

        async function runMonitoring() {

            if (monitoring) return;

            monitoring = true;

            try {

                await monitorDevices(io);

            } catch (err) {

                console.error("Monitoring Error:", err);

            } finally {

                monitoring = false;

            }

        }

        runMonitoring();

        setInterval(runMonitoring, 10000);

    });

io.use((socket, next) => {

    try {

        const token =
            socket.handshake.auth.token;

        if (!token) {

            return next(
                new Error("Authentication Error")
            );

        }

        const decoded =
            jwt.verify(

                token,

                process.env.JWT_SECRET

            );

        socket.userId =
            decoded.id;

        next();

    } catch (err) {

        next(
            new Error("Authentication Error")
        );

    }

});



io.on("connection", socket => {

    console.log(

        "Socket Connected:",

        socket.userId

    );



    socket.join(

        socket.userId

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

                "Socket Disconnected:",

                socket.userId

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