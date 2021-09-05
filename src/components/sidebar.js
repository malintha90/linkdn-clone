import React from 'react'
import { Avatar } from '@material-ui/core'
import '../styles/sidebar.css'

const Sidebar = ({user}) => {

    let displayName="";
    let recentTask="";

    if(user && user.displayName.includes('|')){
        displayName = user.displayName.split('|').[0];
        recentTask = user.displayName.split('|').[1].split(',');
    }else{
        displayName = user.displayName;
    }


    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <img src="./images/background.jpg" alt=""/>
                    <Avatar className="sidebar_avatar" src={user.photoURL? user.photoURL:"./images/avatar.jpg"}/>
                    <h2>{displayName}</h2>
                    <h4>{user.email}</h4>
            </div>
            <div className="sidebar_status">
                <div className="sidebar_stat">
                    <p> Who viewed you</p>
                    <p className="sidebar_stat_number">100</p>
                </div>  
                <div className="sidebar_stat">
                    <p>View on post</p>
                    <p className="sidebar_stat_number">125</p>
                </div>   
            </div>
            <div className="sidebar_bottom">
                <p>Recent</p>
               {
                   recentTask && recentTask.map(task => (
                    <div className="sidebar_items">
                        <span className="sidebar_hash">#</span>
                        <p>{task}</p>
                    </div>
                   ))
               }
            </div>
        </div>
    )
}

export default Sidebar
