import axios from "axios"
import { isLoggedIn } from "../../auth/handler/Authentication"

export const getFriendsPosts = () => {

    const token = isLoggedIn()

    if (!token) return { error: "Unauthorized access denied" }

    return axios.get(`${process.env.REACT_APP_URL}/post/user/${token.id}`, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    })
}

export const updateUserLike = (data) => {
    // /post/likes/:id/:id2/:likes/:type
    const token = isLoggedIn()

    if (!token) return { error: "Unauthorized access denied" }

    const { postId, likes, type } = data

    return fetch(`${process.env.REACT_APP_URL}/post/likes/${token.id}/${postId}/${likes}/${type}`, {
        method: "put",
        headers: {
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}