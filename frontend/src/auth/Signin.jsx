import React, { useState } from "react";
import "./css/Signin.css";
import { Link, Redirect } from "react-router-dom";
import { userSignin, authenticate } from "./handler/Authentication"

export default function Signin(props) {

    // will store user email and password
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    // if some error is returned by backedn will be captured and stored here
    const [errors, setErrors] = useState("");

    // will handle form change
    const handleChange = (e) => {
        setCredentials((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
    };

    // the function will login the user and will store the token in localstorage
    const validateUser = () => {
        if (credentials.email && credentials.password) {

            userSignin(credentials)
                .then((response) => {
                    const data = response.data
                    if (data.error) setErrors(data.error)
                    else {
                        authenticate(data)
                        props.loginState()
                    }
                })
                .catch((err) => console.log(err))
        }
        else {
            setErrors("Please enter email and password")
        }
    }

    if (props.isLoggedIn) return (<Redirect exact to="/home" />)

    return (
        <div className="signin">
            <div id="signin-container">
                <h3>Login</h3>
                <form className="signin-form">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="email"
                        value={credentials.email}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="password"
                        value={credentials.password}
                    />
                </form>
                <div id="error">{errors}</div>
                <div className="login-button" onClick={validateUser}>
                    login
        		</div>
                <p>create account? <Link to="/signup">signup</Link></p>
            </div>
        </div>
    )
}
