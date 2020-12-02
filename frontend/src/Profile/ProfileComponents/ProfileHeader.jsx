import React from 'react'

export default function Header(props) {

    const { posts_no, username, friends_no, dp, userId } = props.data
    let url = ""

    if (dp) {
        url = `${process.env.REACT_APP_URL}/user/display_picture/${userId}`
    }


    return (
        <div className="header-container">
            <div>
                {url && <img src={url} alt="" />}
                {!url && username && <p className="user-name">{username[0].toUpperCase()}</p>}
                <p>{username}</p>
            </div>
            <div>
                <p>{posts_no}</p>
                <p>Posts</p>
            </div>
            <div>
                <p>{friends_no}</p>
                <p>Friends</p>
            </div>
        </div>
    )
}
