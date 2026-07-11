import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    res.data.user
                )
            );

            navigate("/");

        }

        catch (err) {

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="auth-container">

            <h1>NetWatch</h1>

            <form onSubmit={login}>

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>
                        setEmail(e.target.value)
                    }

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>
                        setPassword(e.target.value)
                    }

                />

                <button>

                    Login

                </button>

            </form>

            <p>

                Don't have an account?

                <Link to="/register">

                    Register

                </Link>

            </p>

        </div>

    );

}

export default Login;