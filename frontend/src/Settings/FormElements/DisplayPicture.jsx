import React, { useState } from 'react'
import { uploadImage } from '../handler/handler'
import { updateToken } from './../../auth/handler/Authentication';

export default function DisplayPicture() {

    // for storing image data 
    const [displayPicture, setDisplayPicture] = useState("")

    // checkes if image was upload successfully or not
    const [success, setSuccess] = useState(false);

    // error handling
    const [error, setError] = useState();

    const handleChange = (e) => {
        setDisplayPicture(e.target.files[0])
    }

    const uploadDisplayPicture = () => {

        if (displayPicture) {

            const formData = new FormData()
            formData.append("display_picture", displayPicture, displayPicture.name)

            uploadImage(formData)
                .then(response => {
                    const data = response.data

                    if (data.error) {
                        setError(data.error)
                        const timeoutId = setTimeout(() => {
                            setError("")
                            console.log("timeout")
                            clearTimeout(timeoutId)
                        }, 2000)
                    }
                    else {
                        setSuccess(true)
                        setError("")
                        setDisplayPicture("")
                        updateToken(true)
                        const timeoutId = setTimeout(() => {
                            setSuccess(false)
                            console.log("timeout")
                            clearTimeout(timeoutId)
                        }, 2000)
                    }
                })
        }
        else {
            setError("Insert file before uploading")
            const timeoutId = setTimeout(() => {
                setError("")
                console.log("timeout")
                clearTimeout(timeoutId)
            }, 2000)
        }
    }

    return (

        <div className="display-picture-container">
            {success && <div className="message"><p>Image was uploaded successfully</p></div>}
            {error && <div className="error"><p>{error}</p></div>}
            <p>Profile Picture</p>
            <input
                type="file"
                name="displayPicture"
                accept="image"
                placeholder="Choose a file"
                onChange={handleChange}
            />
            <div className="change-field" onClick={uploadDisplayPicture}>upload</div>
        </div>
    )
}
