import React from "react"
import "./Navbar.css"
import { Link, Redirect } from "react-router-dom"



export default function Navbar(props) {


    const clearToken = () => {
        localStorage.removeItem("jwt-token")
        props.loginState()
    }


    return (
        <div className="navbar">
            <Link to="/">
                <h2>HobNob</h2>
            </Link>

            {props.isLoggedIn && <div className="signout" onClick={clearToken}>signout</div>}
        </div>
    )

}
