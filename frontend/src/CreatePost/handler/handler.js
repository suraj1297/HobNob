// import axios from "axios"
import { isLoggedIn } from "../../auth/handler/Authentication"


export const uploadUserPost = data => {

    const token = isLoggedIn()
    if (token)
        return fetch(`${process.env.REACT_APP_URL}/post/createPost/${token.id}`, {
            method: "post",
            body: data,
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }).then(response => response.json())
    else
        return JSON.stringify({ error: "Unauthorized access denied" })
}