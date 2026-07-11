const express =
    require("express");

const router =
    express.Router();

const Alert =
    require("../models/Alert");

const auth =
    require("../middleware/auth");



// ==========================
// Get Logged-in User Alerts
// ==========================

router.get(

    "/",

    auth,

    async(req, res) => {

        try {

            const alerts =
                await Alert.find({

                    userId: req.user.id

                })

            .sort({

                createdAt: -1

            })

            .limit(50);

            res.json(alerts);

        } catch (error) {

            res.status(500).json({

                error: error.message

            });

        }

    }

);

module.exports =
    router;