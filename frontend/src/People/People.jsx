import React from 'react'
import UserCard from './../Home/UserCard'
import "./People.css"
import { useState, useEffect } from 'react';
import { getSearchedPeople, sendFriendRequest, deleteFriendRequest } from './handler/handler';
import { useParams } from "react-router-dom"
import { isLoggedIn } from '../auth/handler/Authentication';


export default function People() {

    const [people, setPeople] = useState([])

    // checkes if image was upload successfully or not
    const [success, setSuccess] = useState('');

    const [error, setError] = useState();

    let { name } = useParams()


    useEffect(() => {
        getSearchedPeople(name).then(resposne => {
            const data = resposne.data
            if (data.error) {
                setError(data.error)
                const timeoutId = setTimeout(() => {
                    setError("")
                    console.log("timeout")
                    clearTimeout(timeoutId)
                }, 2000)
            }
            else {
                setPeople(data.people)
            }
        })
    }, [name, success, error])


    const sendRequest = (e) => {
        const to = e.target.attributes.data.value
        sendFriendRequest(to)
            .then(response => {
                const data = response.data
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
                    setSuccess('Friend request was sent successfully')
                    const timeoutId = setTimeout(() => {
                        setSuccess("")
                        console.log("timeout")
                        clearTimeout(timeoutId)
                    }, 2000)
                }
            })
    }

    const deleteRequest = (e) => {
        const to = e.target.attributes.data.value
        deleteFriendRequest({ to: to, reverse: null })
            .then(response => {
                const data = response.data
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
                    setSuccess('Request was deleted successfully')
                    const timeoutId = setTimeout(() => {
                        setSuccess('')
                        console.log("timeout")
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
                <h3>People you searched for</h3>
                {people.map(user =>
                    <PeopleTile key={user._id} {...user} sendRequest={sendRequest} deleteRequest={deleteRequest} />)
                }
            </div>
        </React.Fragment>
    )
}


function PeopleTile(props) {

    let url = ""
    if (props.dp) url = `url(${process.env.REACT_APP_URL}/user/display_picture/${props._id})`

    return (
        <div className="people-tile">
            {url && <div className="profile-picture" style={{ backgroundImage: url }}></div>}
            {!url && <p className="profile-picture-name">{props.firstname[0].toUpperCase()} </p>}
            <div>
                <p>
                    <span>{props.firstname[0].toUpperCase() + props.firstname.slice(1, props.firstname.length).toLowerCase()} </span>
                    <span>{props.lastname[0].toUpperCase() + props.lastname.slice(1, props.lastname.length).toLowerCase()}</span>
                </p>
                <p><span>username: </span>{props.username}</p>
            </div>
            {isLoggedIn().id === props._id
                ?
                <div id="hidden"></div>
                : props.friends.includes(isLoggedIn().id) ?
                    <div data={`${props._id}`}>unfollow</div>
                    : props.friend_requests.includes(isLoggedIn().id) ?
                        <div data={`${props._id}`} onClick={props.deleteRequest}>delete request</div>
                        : <div data={`${props._id}`} onClick={props.sendRequest}>send request</div>
            }
        </div>
    )
}
