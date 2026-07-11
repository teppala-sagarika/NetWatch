import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../services/api";

function VerifyOTP() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const verifyOTP = async () => {

        try {

            await API.post(

                "/auth/verify",

                {

                    email,

                    otp

                }

            );

            alert(

                "Account Verified"

            );

            navigate("/login");

        }

        catch {

            alert(

                "Invalid OTP"

            );

        }

    };

    return (

        <div className="auth-container">

            <h2>

                Verify Email

            </h2>

            <p>

                OTP sent to

            </p>

            <b>

                {email}

            </b>

            <input

                placeholder="Enter OTP"

                value={otp}

                onChange={(e)=>

                    setOtp(

                        e.target.value

                    )

                }

            />

            <button

                onClick={verifyOTP}

            >

                Verify

            </button>

        </div>

    );

}

export default VerifyOTP;