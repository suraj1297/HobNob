import React from 'react'
import { useState } from 'react'
import loading from "../asset/loading.gif"
import { useEffect } from 'react';
import PostCard from '../../PostCard/PostCard';
import { getFriendsPosts } from './../handler/handler';

export default function StoryPage() {


    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState()

    const [posts, setPosts] = useState([])


    useEffect(() => {
        getFriendsPosts()
            .then(response => {
                const data = response.data
                if (data.error) setError(data.error)
                else {
                    setPosts(data.posts)
                    setIsLoading(false)
                }
            })
    }, [posts])



    if (isLoading) return <img src={loading} alt="" id="loading" />

    return (
        <React.Fragment>
            {error && <div className="error">{error}</div>}
            <div className="story-page-container">
                {posts.map(post =>

                    <PostCard key={post._id} url={`${process.env.REACT_APP_URL}/post/image/${post._id}`} {...post} />
                )}
            </div>
        </React.Fragment>
    )
}
