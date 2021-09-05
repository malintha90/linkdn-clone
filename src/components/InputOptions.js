import React from 'react'
import '../styles/inputOptions.css'


const InputOptions = ({Icon, title, color}) => {
    return (
        <div className="input_options">
            {Icon && <Icon style={{color:color}}/>}
            <h4>{title}</h4>
        </div>
    )
}

export default InputOptions
