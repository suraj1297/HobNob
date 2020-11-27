import axios from "axios"
import { isLoggedIn } from "../../auth/handler/Authentication"

export const getSearchedPeople = (name) => {

    const token = isLoggedIn()
    if (token)
        return axios.get(`${process.env.REACT_APP_URL}/people?name=${name}`,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            })
    else
        return JSON.stringify({ error: "Unauthorized access denied" })
}

export const sendFriendRequest = (to) => {

    const token = isLoggedIn()
    if (token)
        return axios.put(`${process.env.REACT_APP_URL}/user/friendrequest/${token.id}/${to}`,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            })
    else
        return JSON.stringify({ error: "Unauthorized access denied" })
}

export const deleteFriendRequest = (data) => {

    const { to, reverse } = data
    const token = isLoggedIn()

    const url = reverse ?
        `${process.env.REACT_APP_URL}/user/friendrequest/${reverse}/${token.id}`
        : `${process.env.REACT_APP_URL}/user/friendrequest/${token.id}/${to}`

    if (token)
        return axios.delete(url,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            })
    else
        return JSON.stringify({ error: "Unauthorized access denied" })
}