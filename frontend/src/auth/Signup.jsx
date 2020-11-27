import React from 'react'
import "./css/Signup.css"
import { useState } from 'react';
import { userSignup, isLoggedIn } from './handler/Authentication';
import { Redirect } from 'react-router-dom';

export default function Signup() {

    const [formData, setFormData] = useState({
        "firstname": "",
        "lastname": "",
        "username": "",
        "email": "",
        "password": ""
    })

    //  destructring formData
    const { firstname, lastname, username, email, password } = formData

    // if some error is returned by backedn will be captured and stored here
    const [errors, setErrors] = useState("");

    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {

        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitData = () => {
        if (firstname && lastname && username && email && password) {

            userSignup(formData)
                .then(response => {
                    console.log(response.data)
                    const data = response.data
                    if (data.error) setErrors(data.error)
                    else {
                        setSuccess(true)
                        setErrors("")
                    }
                })
                .catch(err => console.log(err))

        } else setErrors("All fields are neccessary")
    }

    if (isLoggedIn()) return <Redirect to="/home" />

    else if (success) return <Redirect to="/signin" />

    return (
        <div className="signup-container">
            <div className="signup">
                <h3>Signup</h3>
                <form>
                    <input type="text" name="firstname" placeholder="First name" value={firstname} onChange={handleChange} />
                    <input type="text" name="lastname" placeholder="Last name" value={lastname} onChange={handleChange} />
                    <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
                    <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                </form>
                <div id="errors">{errors}</div>
                <div id="submit" onClick={submitData}>SingnUp</div>
            </div>
        </div>
    )
}
