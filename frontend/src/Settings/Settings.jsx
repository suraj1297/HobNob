import React, { Component } from 'react'
import UserCard from '../Home/UserCard'
import SettingsForm from './SettingsForm';

export default class Settings extends Component {
    render() {
        return (
            <React.Fragment>
                <UserCard />
                <SettingsForm />
            </React.Fragment>
        )
    }
}
