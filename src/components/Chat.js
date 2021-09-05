import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getChatUsers } from '../actions/userAction';
import Header from './header';
import ChatRightBar from './ChatRightBar';
import '../styles/chat.css';
import { db } from '../firebase/firebase';
import { getMessages } from '../actions/chatAction';


const Chat = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user)
    const { userList} = useSelector(state => state.userList);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [receiverUID, setReceiverUID] = useState('');

    let unsubscribe;
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        unsubscribe = dispatch(getChatUsers(user.uid))
        .then(unsubscribe => {
            return unsubscribe;
        }).catch(error => {
            console.log("Error =",error);
        })
    },[])
    
    useEffect(() => {
        return () => { 
            unsubscribe.then(f => f()) 
        }
    },[] );

    const initChat = (otherUser) => {
        dispatch(getMessages(user.uid, receiverUID));
        setChatStarted(true);
        setChatUser(otherUser.userName);
        setReceiverUID(otherUser.uid);        
    }

    return (    
        <>
        <Header photo={user.photoURL}/> 
        <div className="chatWrapper">  
            <div className="msg-left">
                <div className="sidebar_bottom">
                    <div className="chatWith">Chat With : { chatStarted ? chatUser: ''}</div>
                    <p>People</p> 
                    {userList && userList.map(ul => (
                        <div className="sidebar_items" key={ul.uid} onClick={(e) => initChat(ul)}>
                            <Avatar className="sidebar_avatar" src={ul.photoURL? ul.photoURL:"./images/avatar.jpg"}/>
                            <p>{ul.userName}</p>
                        </div>
                    ))}                  
                </div>    
            </div> 
            <ChatRightBar chatStarted={chatStarted} receiverUID={receiverUID}/>
        </div>
    </>
    )
}

export default Chat
