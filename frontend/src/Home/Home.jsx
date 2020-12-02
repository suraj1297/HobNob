import React, { Component } from 'react'
import UserCard from './UserCard'
import StoryPage from './StoryPage/StoryPage';
import "./Home.css"

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <UserCard />
                <StoryPage />
            </React.Fragment>
        )
    }
}
