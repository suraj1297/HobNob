import React from 'react'
import { useState, useEffect } from 'react';
import './FriendRequests.css';
import UserCard from './../Home/UserCard';
import { getFriendRequests, getUser, acceptFriendRequest } from './../Friends/handler/handler';
import { deleteFriendRequest } from '../People/handler/handler';
import { isLoggedIn } from '../auth/handler/Authentication';

export default function FriendRequests() {

    const [friendRequests, setFriendRequests] = useState([])

    // checkes if image was upload successfully or not
    const [success, setSuccess] = useState('');

    const [error, setError] = useState();

    const requests = () => {
        getFriendRequests()
            .then(response => {
                const data = response.data

                if (data.error) {
                    setError(data.error)
                    const timeoutId = setTimeout(() => {
                        setError('')
                        clearTimeout(timeoutId)
                    }, 2000)
                }
                else {
                    setFriendRequests(data.requests)
                }
            })
    }

    useEffect(() => {
        requests()
    }, [])

    const deleteRequest = (e) => {
        const id = e.target.attributes.data.value
        deleteFriendRequest({ to: null, reverse: id })
            .then(response => {
                const data = response.data

                if (data.error) {
                    setError(data.error)
                    const timeoutId = setTimeout(() => {
                        setError("")
                        console.log("timeout")
                        clearTimeout(timeoutId)
                        requests()
                    }, 2000)
                }
                else {
                    setError("")
                    setSuccess("Friend request was deleted")
                    const timeoutId = setTimeout(() => {
                        console.log("timeout")
                        setSuccess("")
                        clearTimeout(timeoutId)
                    }, 2000)
                }
            })
    }

    const acceptRequest = (e) => {
        const id1 = isLoggedIn().id
        const id2 = e.target.attributes.data.value

        acceptFriendRequest(id1, id2)
            .then(data => {

                if (data.error) {
                    setError(data.error)
                    const timeoutId = setTimeout(() => {
                        setError("")
                        console.log("timeout")
                        clearTimeout(timeoutId)
                    }, 2000)
                }
                else {
                    setError("")
                    setSuccess("Friend request was Accepted")
                    requests()
                    const timeoutId = setTimeout(() => {
                        console.log("timeout")
                        setSuccess("")
                        clearTimeout(timeoutId)
                    }, 2000)
                }
            })
    }


    return (
        <React.Fragment>
            {success && <div className="message"><p>{success}</p></div>}
            {error && <div className="error">{error}</div>}
            <UserCard />
            <div className="people-container">
                <h3>Friend Requests</h3>
                {friendRequests.length > 0 && friendRequests.map(id =>
                    <RequestTile key={id} id={id} deleteRequest={deleteRequest} acceptRequest={acceptRequest} />
                )}
                {friendRequests.length === 0 && <div>It's so empty here. Why don't you Ask your friends to connect?</div>}
            </div>
        </React.Fragment>
    )
}

function RequestTile(props) {

    let url = ""

    const [user, setUser] = useState({})

    const [loading, setLoading] = useState(true);

    if (user.dp) url = `url(${process.env.REACT_APP_URL}/user/display_picture/${user._id})`

    useEffect(() => {
        getUser(props.id)
            .then(respose => {
                setUser(respose.data)
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (loading) return (<div>Loading.....</div>)


    return (

        <div className="people-tile">
            {url && <div className="profile-picture" style={{ backgroundImage: url }}></div>}
            {!url && <p className="profile-picture-name">{user.firstname[0].toUpperCase()} </p>}
            <div>
                <p>
                    <span>{user.firstname[0].toUpperCase() + user.firstname.slice(1, user.firstname.length).toLowerCase()} </span>
                    <span>{user.lastname[0].toUpperCase() + user.lastname.slice(1, user.lastname.length).toLowerCase()}</span>
                </p>
                <p id="username"><span>username: </span>{user.username}</p>
            </div>
            <div data={`${user._id}`} id="delete-button" onClick={props.deleteRequest}>delete</div>
            <div data={`${user._id}`} id="accept-button" onClick={props.acceptRequest}>accept</div>
        </div>
    )
}
