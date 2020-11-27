import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Signin from "./auth/Signin"
import Navbar from "./base/navbar/Navbar"
import { isLoggedIn } from './auth/handler/Authentication'
import PrivateRoute from './ProtectedRoutes/PrivateRoute'
import Signup from './auth/Signup'
import Settings from './Settings/Settings';
import People from './People/People';
import Friends from './Friends/Friends';
import FriendRequests from "./FriendRequests/FriendRequests"

export default class App extends Component {

	constructor() {
		super()
		this.state = {
			isLoggedIn: isLoggedIn()
		}
	}

	loginState = () => {
		this.setState({
			isLoggedIn: isLoggedIn()
		})
	}

	render() {
		return (
			<Router>
				<Navbar loginState={this.loginState} isLoggedIn={this.state.isLoggedIn} />
				<Switch>
					<Redirect exact from="/" to="/signin" />
					<Route path="/signin">
						<Signin loginState={this.loginState} isLoggedIn={this.state.isLoggedIn} />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<PrivateRoute path="/settings" component={() => <Settings />} />
					<PrivateRoute path="/people/:name" component={() => <People />} />
					<PrivateRoute path="/friends" component={() => <Friends />} />
					<PrivateRoute path="/friend_requests" component={() => <FriendRequests />} />
				</Switch>
			</Router>
		)
	}
}
