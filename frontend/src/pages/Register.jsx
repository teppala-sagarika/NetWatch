import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: ""

    });

    const change = (e) => {

        setForm({

            ...form,

            [e.target.name]:
            e.target.value

        });

    };

    const register = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(

                "/auth/register",

                form

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

                "Registration Failed"

            );

        }

    };

    return (

        <div className="auth-container">

            <h1>NetWatch</h1>

            <form onSubmit={register}>

                <input

                    name="name"

                    placeholder="Name"

                    onChange={change}

                />

                <input

                    name="email"

                    type="email"

                    placeholder="Email"

                    onChange={change}

                />

                <input

                    name="password"

                    type="password"

                    placeholder="Password"

                    onChange={change}

                />

                <button>

                    Register

                </button>

            </form>

            <p>

                Already have an account?

                <Link to="/login">

                    Login

                </Link>

            </p>

        </div>

    );

}

export default Register;