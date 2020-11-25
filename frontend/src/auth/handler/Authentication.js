const axios = require("axios")

export const userSignin = (credentials) => {
    return axios.post(`${process.env.REACT_APP_URL}/signin`, credentials)
}

export const authenticate = (data) => {
    localStorage.setItem("jwt-token", JSON.stringify(data))
}

export const isLoggedIn = () => {
    if (localStorage.getItem("jwt-token"))
        return JSON.parse(localStorage.getItem("jwt-token"))
    return false
}