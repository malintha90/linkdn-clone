import React from 'react';
import { useSelector } from 'react-redux';
import {auth} from '../firebase/firebase';
import SendMessage from './SendMessage';

const ChatRightBar = ({chatStarted,receiverUID}) => {

    const {chats} = useSelector(state => state.chats)

    return (

        <div className="msgs"> 
            {chatStarted ?      
                <>               
                    {chats && chats.map(message => (
                        <div className="msg-line" key={message.timestamp}>
                            <div key={message.id} className={`msg ${message.uid === auth.currentUser.uid?'sent':'received'}`}>
                                <p className="msgText">{message.text}</p>
                            </div>
                        </div>
                    ))}
                </>
            : null}   
                <SendMessage chatStarted={chatStarted} receiverUID={receiverUID}/>
        </div>                                                         
       
    )
}

export default ChatRightBar
