import axios from "axios"

export const authenticate = (data) => {
    localStorage.setItem("jwt-token", JSON.stringify(data))
}

export const isLoggedIn = () => {
    if (localStorage.getItem("jwt-token"))
        return JSON.parse(localStorage.getItem("jwt-token"))
    return false
}

export const userSignin = (credentials) => {
    return axios.post(`${process.env.REACT_APP_URL}/signin`, credentials)
}

export const userSignup = (formData) => {
    return axios.post(`${process.env.REACT_APP_URL}/signup`, formData)
}

export const updateToken = (value) => {
    if (localStorage.getItem("jwt-token")) {
        let data = JSON.parse(localStorage.getItem("jwt-token"))
        data.dp = value
        localStorage.setItem("jwt-token", JSON.stringify(data))
    }
    return false
}