import React from 'react'
import "./Profile.css"
import UserCard from './../Home/UserCard'
import ProfileHeader from './ProfileComponents/ProfileHeader'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllPosts } from './handler/handler';
import PostWall from './ProfileComponents/PostWall'
import loading from "./../Home/asset/loading.gif"
import { useParams } from "react-router-dom"
import { isLoggedIn } from '../auth/handler/Authentication'

export default function Profile() {

    let { id } = useParams()

    const [error, setError] = useState('')

    const [posts, setPosts] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [username, setUsername] = useState('')
    const [friends_no, setFriends_no] = useState(0)
    const [posts_no, setPosts_no] = useState(0)
    const [dp, setDp] = useState(false)
    const [userId, setUserId] = useState('')
    const [render] = useState(isLoggedIn().id === id ? true : false);



    const getPosts = () => {
        return getAllPosts(id)
    }

    useEffect(() => {
        getPosts()
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
                    setError('')
                    if (data.posts && data.posts.length > 0) {
                        setPosts(data.posts)
                        setUsername(data.posts[0].user.username)
                        setPosts_no(data.posts.length)
                        setFriends_no(data.posts[0].user.friends.length)
                        setDp(data.posts[0].user.dp)
                        setUserId(data.posts[0].user._id)
                        setIsLoading(false)
                    } else {
                        setUsername(data.username)
                        setPosts_no(0)
                        setFriends_no(data.friends.length)
                        setDp(data.dp)
                        setUserId(data._id)
                        setIsLoading(false)
                    }
                }
            })
    }, [])

    const errorMessage = (error) => {
        setError(error)
        const timeoutId = setTimeout(() => {
            setError("")
            clearTimeout(timeoutId)
        }, 2000)
    }

    const reRender = () => {
        getPosts()
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
                    setError('')
                    if (data.posts && data.posts.length > 0) {
                        setPosts(data.posts)
                        setUsername(data.posts[0].user.username)
                        setPosts_no(data.posts.length)
                        setFriends_no(data.posts[0].user.friends.length)
                        setDp(data.posts[0].user.dp)
                        setUserId(data.posts[0].user._id)
                        setIsLoading(false)
                    } else {
                        setUsername(data.username)
                        setPosts_no(0)
                        setFriends_no(data.friends.length)
                        setDp(data.dp)
                        setUserId(data._id)
                        setIsLoading(false)
                    }
                }
            })
    }


    return (
        <React.Fragment>
            {error && <div className="error">{error}</div>}
            <UserCard style={{ left: "50px" }} />
            {isLoading && <img src={loading} alt="" id="loading-profile" />}
            {!isLoading &&
                <React.Fragment>
                    <ProfileHeader data={{ username, posts_no, friends_no, userId, dp }} />
                    <div className="postwall-container">
                        {posts.length > 0 && posts.map(post =>
                            <PostWall key={post._id} {...post} errorMessage={errorMessage} reRender={reRender} render={render} />)
                        }
                        {posts.length <= 0 &&
                            <p className="empty-message">How about you post something on your wall? Your friends will definitely love them!</p>
                        }
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    )
}