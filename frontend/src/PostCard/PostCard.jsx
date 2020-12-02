import React from 'react'
import "./PostCard.css"
import { useEffect, useState } from 'react'
import { updateUserLike } from "../Home/handler/handler"
import { isLoggedIn } from '../auth/handler/Authentication'

export default function PostCard(props) {

    let { url, caption, active } = props

    const [error, setError] = useState('')

    const [heart, setHeart] = useState("black")

    let dp = false
    if (props.user)
        dp = props.user.dp

    let date = null

    if (props.created_at) {
        const postedOn = new Date(props.created_at)
        date = `${postedOn.getDate()}/${postedOn.getMonth()}/${postedOn.getFullYear()}`
    }


    const update = (data) => {
        updateUserLike(data)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    const timeoutId = setTimeout(() => {
                        setError("")
                        console.log("timeout")
                        clearTimeout(timeoutId)
                    }, 2000)
                }
            })
    }

    const like = (e) => {

        const postId = e.target.attributes.data.value
        const element = document.querySelector(`#icon-${postId}`)
        const likes = parseInt(element.innerText) + 1
        element.innerText = likes
        setHeart("red")
        update({ postId, likes, type: "push" })

    }

    const unlike = (e) => {
        const postId = e.target.attributes.data.value
        const element = document.querySelector(`#icon-${postId}`)
        const likes = parseInt(element.innerText) - 1
        element.innerText = likes
        setHeart("black")
        props.liked_by.splice(props.liked_by.includes(isLoggedIn().id), 1)
        update({ postId, likes, type: "pop" })
    }

    useEffect(() => {
        if (document.querySelector("#caption-text-p")) {
            const element = document.querySelector("#caption-text-p")
            element.innerText = caption
        }
    }, [caption])

    // console.log(props)
    return (
        <div className="post-container">
            {error && <div className="error">{error}</div>}
            {active !== false &&
                <div className="dp-username-container">
                    {dp && <div className="dp" style={{ backgroundImage: `url(${process.env.REACT_APP_URL}/user/display_picture/${props.user._id})` }}></div>}
                    {!dp && <div className="dp-name">{props.user.username[0]}</div>}
                    <p>{props.user.username}</p>
                </div>
            }

            <div><img src={url} alt="" className="post-image" /></div>

            {active !== false && (
                <React.Fragment>
                    <div className="caption-container">
                        <div className="caption"><p id="caption-text">{caption}</p></div>
                        <div>
                            {heart === "black" && !props.liked_by.includes(isLoggedIn().id) ?
                                <i className="fa fa-heart-o" aria-hidden="true" onClick={like} data={props._id}></i>
                                : <i className="fa fa-heart" aria-hidden="true" onClick={unlike} style={{ color: "red" }} data={props._id}></i>
                            }
                            {/* {(heart === "red") && <i className="fa fa-heart" aria-hidden="true" onClick={updateLike}></i>} */}
                            <span className="likes" id={`icon-${props._id}`}>{props.likes}</span>
                        </div>

                    </div>
                    <p className="posted-date">Posted On: {date}</p>
                </React.Fragment>
            )}
            {
                active === false && <div className="caption-container">
                    <div className="caption"><p id="caption-text-p"></p></div>
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                </div>
            }


        </div>
    )
}
