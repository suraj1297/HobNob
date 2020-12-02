import { isLoggedIn } from "../../auth/handler/Authentication"
import axios from "axios"


export const uploadImage = (data) => {

    const token = isLoggedIn()
    if (token)
        return axios.put(`${process.env.REACT_APP_URL}/user/display_picture/${token.id}`,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            })
    else
        return { error: "Unauthorized access denied" }
}

export const updateData = (data) => {

    const token = isLoggedIn()
    if (token)
        return fetch(`${process.env.REACT_APP_URL}/user/${token.id}`, {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token.token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    else
        return { error: "Unauthorized access denied" }

}