import axios from "axios"
import { isLoggedIn } from "../../auth/handler/Authentication"

export const getAllPosts = (id) => {

    const token = isLoggedIn()

    if (!token) return { error: "Unauthorized access denied" }

    return axios.get(`${process.env.REACT_APP_URL}/posts/${id}`, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    })
}

export const deleteUserPost = (id) => {
    const token = isLoggedIn()
    if (!token) return { error: "Unauthorized access denied" }

    return axios.delete(`${process.env.REACT_APP_URL}/post/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    })
}