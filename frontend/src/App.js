import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Signin from "./auth/Signin"
import Navbar from "./base/navbar/Navbar"
import { isLoggedIn } from './auth/handler/Authentication'

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            isLoggedIn: isLoggedIn()
        }
    }

    loginState() {
        this.setState({
            isLoggedIn: isLoggedIn()
        })
    }

    render() {
        return (
            <Router>
                <Navbar loginState={this.loginState} isLoggedIn={this.state.isLoggedIn} />
                <Switch>
                    <Route exact path="/">
                        <Signin loginState={this.loginState} />
                    </Route>
                    <Route exact path="/home">
                        <div>
                            Home
                        </div>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
