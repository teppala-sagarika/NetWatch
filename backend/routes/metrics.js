const express = require("express");
const router = express.Router();

const getSystemMetrics =
    require("../services/monitor");

router.get("/", async(req, res) => {
    try {

        const metrics =
            await getSystemMetrics();

        res.json(metrics);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

module.exports = router;