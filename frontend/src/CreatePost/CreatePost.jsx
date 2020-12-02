import React, { useState } from 'react'
import UserCard from './../Home/UserCard'
import "./CreatePost.css"
import { uploadUserPost } from './handler/handler';
import PostForm from './PostForm.jsx/PostForm';

export default function CreatePost() {

    // checkes if image was upload successfully or not
    const [success, setSuccess] = useState('')

    const [error, setError] = useState()

    const uploadPost = (data) => {
        const { image, caption, type } = data

        if (!image) {
            setError("Please add image to create post")
            const timeoutId = setTimeout(() => {
                setError("")
                console.log("timeout")
                clearTimeout(timeoutId)
            }, 2000)
        }
        else {

            const formData = new FormData()
            formData.append("image", image, image.name)
            formData.append("caption", caption)
            formData.append("created_at", new Date())
            formData.append("type", type)

            uploadUserPost(formData)
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
                        setSuccess("Post was created successfully")
                        setError("")
                        const timeoutId = setTimeout(() => {
                            setSuccess("")
                            console.log("timeout")
                            clearTimeout(timeoutId)
                        }, 2000)
                    }
                })
        }
    }

    return (
        <React.Fragment>
            {success && <div className="message"><p>{success}</p></div>}
            {error && <div className="error">{error}</div>}
            <UserCard />
            <PostForm uploadPost={uploadPost} success={success} />

        </React.Fragment>
    )
}
