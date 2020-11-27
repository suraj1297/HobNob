import axios from "axios"
import { isLoggedIn } from "../../auth/handler/Authentication"

export const getFriendRequests = () => {

    const token = isLoggedIn()

    if (token) {
        return axios.get(`${process.env.REACT_APP_URL}/user/friendrequests/${token.id}`, {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        })
    }
    else return JSON.stringify({ error: "Unauthorized access denied" })
}

export const getUser = (id) => {
    const token = isLoggedIn()

    if (token) {
        return axios.get(`${process.env.REACT_APP_URL}/user/${id}`, {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        })
    }
    else return JSON.stringify({ error: "Unauthorized access denied" })
}


export const acceptFriendRequest = (id1, id2) => {

    const token = isLoggedIn()
    if (token)
        return fetch(`${process.env.REACT_APP_URL}/user/acceptrequest/${id1}/${id2}`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${token.token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    else
        return JSON.stringify({ error: "Unauthorized access denied" })
}