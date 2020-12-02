import React from 'react'
import "./UserCard.css"
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../auth/handler/Authentication';

export default function UserCard(props) {

    let url = ""

    if (isLoggedIn().dp) {
        url = `url(${process.env.REACT_APP_URL}/user/display_picture/${isLoggedIn().id})`
    }

    const styles = {
        backgroundImage: url
    }

    return (
        <div className="user-card" style={props.style}>
            { url && <div className="display-picture" style={styles}></div>}
            {!url && <p className="user-picture">{isLoggedIn().name[0].toUpperCase()} </p>}
            <NavLink to="/home" activeClassName="selected">Home</NavLink>
            <NavLink to={`/profile/${isLoggedIn().id}`} activeClassName="selected">Profile</NavLink>
            <NavLink to="/post-story" activeClassName="selected">Create Post</NavLink>
            <NavLink to="/settings" activeClassName="selected">Settings</NavLink>
            <NavLink to="/friends" activeClassName="selected">Friends</NavLink>
            <NavLink to="/friend_requests" activeClassName="selected">Friend Requests</NavLink>
        </div>
    )

}
