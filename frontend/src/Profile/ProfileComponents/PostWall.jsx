import React from 'react'
import { deleteUserPost } from '../handler/handler'

export default function PostWall(props) {

    const deletePost = (e) => {
        const username = prompt("Enter username for confirmation!")

        if (username === props.user.username) {
            deleteUserPost(e.target.attributes.data.value)
                .then(response => {
                    const data = response.data
                    if (data.error) props.errorMessage(data.error)
                    else props.reRender()
                })
        } else {
            alert("Incorrect Username")
        }
    }

    return (
        <div className="img-container">
            <img src={`${process.env.REACT_APP_URL}/post/image/${props._id}`} alt="" />
            {props.render && <i className="fa fa-trash" aria-hidden="true" id="trash-can" data={props._id} onClick={deletePost}></i>}
        </div>

    )
}
