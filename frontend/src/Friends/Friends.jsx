import React, { useState } from 'react'
import UserCard from './../Home/UserCard';
import { getFriendsArray, unfollowfriend } from './handler/handler'
import { useEffect } from 'react'
import { getUser } from '../FriendRequests/handler/handler'
import { isLoggedIn } from '../auth/handler/Authentication'
import loading from "../Home/asset/loading.gif"


export default function Friends() {

    const [friends, setFriends] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    // checkes if image was upload successfully or not
    const [success, setSuccess] = useState('')

    const [error, setError] = useState()

    const getFriends = () => {
        getFriendsArray()
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
                    setError("")
                    setFriends(data.friends)
                    setIsLoading(false)
                }
            })
    }

    useEffect(() => {
        getFriends()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const unfollow = (e) => {
        const id1 = isLoggedIn().id
        const id2 = e.target.attributes.data.value

        unfollowfriend(id1, id2)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    const timeoutId = setTimeout(() => {
                        setError('')
                        clearTimeout(timeoutId)
                    }, 2000)
                }
                else {
                    setSuccess("Unfollowed")
                    setError("")
                    getFriends()
                    const timeoutId = setTimeout(() => {
                        setError("")
                        setSuccess('')
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
            {isLoading && <img src={loading} alt="" id="loading-profile" />}
            {!isLoading &&
                <div className="people-container">
                    <h3>Friends</h3>
                    {friends.length > 0 && friends.map(id =>
                        <FriendTile key={id} id={id} unfollow={unfollow} />
                    )}
                    {friends.length === 0 && <div>It's so empty here. Why don't you Ask your friends to connect?</div>}
                </div>
            }
        </React.Fragment>
    )
}


function FriendTile(props) {

    let url = ""

    const [user, setUser] = useState({})

    const [isLoading, setIsLoading] = useState(true)

    if (user.dp) url = `url(${process.env.REACT_APP_URL}/user/display_picture/${user._id})`

    useEffect(() => {
        getUser(props.id)
            .then(respose => {
                setUser(respose.data)
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displayProfile = (e) => {
        console.log(e.target)
        window.open(`/profile/${e.target.attributes.data.value}`)
    }


    if (isLoading) return (<img src={loading} alt="" className="loadingGif" style={{ width: "50%", marginRight: "150px" }} />)

    return (

        <div className="people-tile">
            {url && <div className="profile-picture" style={{ backgroundImage: url }}></div>}
            {!url && <p className="profile-picture-name">{user.firstname[0].toUpperCase()} </p>}
            <div data={user._id} onClick={displayProfile} style={{ cursor: "pointer" }}>
                <p data={user._id}>
                    <span data={user._id}>{user.firstname[0].toUpperCase() + user.firstname.slice(1, user.firstname.length).toLowerCase()} </span>
                    <span data={user._id}>{user.lastname[0].toUpperCase() + user.lastname.slice(1, user.lastname.length).toLowerCase()}</span>
                </p>
                <p id="username" data={user._id}><span data={user._id}>username: </span>{user.username}</p>
            </div>
            <div data={`${user._id}`} onClick={props.unfollow}>unfollow</div>
        </div>
    )

}