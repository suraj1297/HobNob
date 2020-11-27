import React, { useState } from 'react';
import { updateData } from '../handler/handler';

export default function InputField(props) {

    const [value, setValue] = useState("")

    // checkes if image was upload successfully or not
    const [success, setSuccess] = useState(false)

    // error handling
    const [error, setError] = useState()

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const updateValue = () => {
        if (value)
            updateData({ [props.name]: value })
                .then(data => {
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
                        setValue("")
                        const timeoutId = setTimeout(() => {
                            setSuccess(false)
                            console.log("timeout")
                            clearTimeout(timeoutId)
                        }, 2000)
                    }
                })
        else {
            setError(`${props.name[0].toUpperCase() + props.name.slice(1, props.name.length)} cannot be empty`)
            const timeoutId = setTimeout(() => {
                setError("")
                console.log("timeout")
                clearTimeout(timeoutId)
            }, 2000)
        }
    }

    return (
        <div className="input-container">
            {success && <div className="message"><p>{props.name[0].toUpperCase() + props.name.slice(1, props.name.length)} was updated successfully</p></div>}
            {error && <div className="error"><p>{error}</p></div>}
            <p>{props.name[0].toUpperCase() + props.name.slice(1, props.name.length)}</p>
            <input type={props.type ? props.type : "text"}
                placeholder={props.name}
                name={props.name}
                value={value}
                onChange={handleChange}
            />
            <div className="update-button" onClick={updateValue}>update</div>
        </div>
    )
}



