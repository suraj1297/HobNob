import React, { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar(props) {

    const [searchFor, setSearchFor] = useState("")

    const clearToken = () => {
        localStorage.removeItem("jwt-token")
        props.loginState()
        window.location.assign(`/signin`)
    }

    const handleChange = (e) => {
        setSearchFor(e.target.value)
    }

    const searchPeople = (e) => {
        if (e.key === "Enter") {
            if (searchFor)
                window.location.assign(`/people/${searchFor}`)
        }
    }
    // if (shouldRedirect) return (<Redirect to={`/people/${searchFor}`} />)

    return (
        <div className="navbar">
            <Link to="/">
                <h2>HobNob</h2>
            </Link>

            {props.isLoggedIn &&
                <React.Fragment>
                    <input type="text"
                        placeholder="search people"
                        className="searchbar"
                        onChange={handleChange}
                        onKeyDown={searchPeople}
                    />
                    <i className="fa fa-search" aria-hidden="true"></i>
                </React.Fragment>
            }
            {props.isLoggedIn && <div className="signout" onClick={clearToken}>signout</div>}
        </div>
    )

}
