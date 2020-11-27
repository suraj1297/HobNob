import { Redirect, Route } from "react-router-dom"
import React from 'react'
import { isLoggedIn } from './../auth/handler/Authentication'

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={(routeProps) => {
            return isLoggedIn() ?
                <Component {...routeProps} />
                : <Redirect to="signin" />
        }}>
        </Route>
    )
}
