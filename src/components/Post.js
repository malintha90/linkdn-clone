import React from 'react'
import '../styles/post.css'
import { Avatar } from '@material-ui/core'
import InputOptions from './InputOptions'
import inputReactData from '../constants/reactOptions'
import ReactPlayer from 'react-player'

const Post = ({key,name, description, message, postUrl,shareImage,shareMedia }) => {
    
    return (
        <div className="post" key={key}>
            <div className="post_header">
                <Avatar className="sidebar_avatar" src={postUrl? postUrl:"./images/avatar.jpg"}/>
                <div className="post_info">
                    <h2>{name.split('|').[0]}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="post_body">
                <p>{message}</p>
            </div>
            <div className="post_media">
                {
                    !shareImage && shareMedia ? (<ReactPlayer width={"100%"} url={shareMedia}/>) : 
                    (shareImage && <img src={shareImage} alt=""/>)
                }               
            </div>
            <div className="post_buttons">
                    {
                        inputReactData.map(inputData=> (
                            <InputOptions Icon={inputData.Icon} title={inputData.name} color={inputData.color}/>
                        ))
                        
                    }
            </div>
        </div>
    )
}

export default Post
