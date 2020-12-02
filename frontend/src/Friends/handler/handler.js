import axios from "axios"
import { isLoggedIn } from "../../auth/handler/Authentication"

export const getFriendsArray = () => {
    const token = isLoggedIn()
    if (!token) return { error: "Unauthorized access denied" }

    return axios.get(`${process.env.REACT_APP_URL}/user/friends/${token.id}`,
        {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        })

}

export const unfollowfriend = (id1, id2) => {
    const token = isLoggedIn()
    if (!token) return { error: "Unauthorized access denied" }

    return fetch(`${process.env.REACT_APP_URL}/user/unfollow/${id1}/${id2}`, {
        method: "put",
        headers: {
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())


}