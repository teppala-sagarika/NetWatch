const nodemailer =
    require("nodemailer");

const transporter =
    nodemailer.createTransport({

        service: "gmail",

        auth: {

            user: process.env.EMAIL_USER,

            pass: process.env.EMAIL_PASS

        }

    });

async function sendOTP(
    email,
    otp
) {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "NetWatch Email Verification",

        html: `

            <h2>Welcome to NetWatch</h2>

            <p>Your verification code is:</p>

            <h1>${otp}</h1>

            <p>This code expires in 10 minutes.</p>

        `

    });

}

module.exports =
    sendOTP;