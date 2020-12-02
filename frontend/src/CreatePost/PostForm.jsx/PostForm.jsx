import React, { useState, useEffect } from 'react'
import PostCard from '../../PostCard/PostCard'

export default function PostForm(props) {

    const [values, setValues] = useState({
        image: "",
        caption: "",
        type: "public"
    })

    const { image, caption } = values

    const [url, setUrl] = useState("");

    const handleImageChange = (e) => {

        setValues(prevState => {
            return {
                ...prevState,
                image: e.target.files[0]
            }
        })
        setUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleChangeType = (e) => {
        setValues(prevState => {
            return {
                ...prevState,
                type: e.target.value
            }
        })
    }

    const handleChangeCaption = (e) => {

        const element = document.querySelector("#captionText")
        setValues(prevState => {
            return {
                ...prevState,
                caption: element.value
            }
        })
    }

    const post = () => {
        props.uploadPost(values)
    }

    useEffect(() => {
        document.querySelector("#upload-image").value = ""
        setValues({
            image: "",
            caption: ""
        })
        setUrl('')
    }, [props.success]);

    return (
        <div className="post-form-container">
            <div className="header">
                <h3>Create Post</h3>
                <div className="post-button" onClick={post}>upload post</div>
            </div>

            <form id="post-form">
                <div className="top-container">
                    <div>
                        <p>Image</p>
                        <input
                            type="file"
                            name="postImage"
                            accept="image"
                            placeholder="Choose a file"
                            onChange={handleImageChange}
                            id="upload-image"
                        />
                    </div>

                    <div>
                        <p>Make Post</p>
                        <select name="type" onChange={handleChangeType}>
                            <option value="public">Public</option>
                            <option value="friends">Friends</option>
                        </select>
                    </div>

                </div>

                <div>
                    <p>Caption</p>
                    <textarea name="caption" rows="5" cols="70" placeholder="What's on your mind?"
                        form="post-form" maxLength="200" onChange={handleChangeCaption} id="captionText" value={caption}>

                    </textarea>
                </div>

            </form>

            <h3>Post Preview</h3>

            { (image || caption) && < PostCard url={url} caption={caption} active={false} />}

        </div>
    )
}
