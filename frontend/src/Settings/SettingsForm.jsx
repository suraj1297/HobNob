import React from 'react'
import DisplayPicture from './FormElements/DisplayPicture'
import "./Settings.css"
import InputField from './FormElements/InputField';

export default function SettingsForm() {
    return (
        <div className="settings-container">
            <h3>Update Profile</h3>
            <DisplayPicture />
            <InputField name="firstname" />
            <InputField name="lastname" />
            <InputField name="username" />
            <InputField name="email" type="email" />
            <InputField name="password" type="password" />

        </div>
    )
}
