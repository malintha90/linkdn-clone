import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Input, Button} from '@material-ui/core';
import { messageSend } from '../actions/chatAction';
import { auth } from '../firebase/firebase';

const SendMessage = ({chatStarted,receiverUID}) => {

    const dispatch = useDispatch();
    const [seMessage, setSendMessage] = useState('');

    const send = (e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;
        dispatch(messageSend(uid,photoURL,seMessage,receiverUID));
        setSendMessage('')
    }
    return (
        <div className="send-message">         
            {chatStarted ?
             <>
                <Input type="text" value={seMessage} placeholder="Message ..." onChange={e => setSendMessage(e.currentTarget.value)}/>
                <Button onClick={send} typr="submit">Send</Button>
            </>
            :null}
        </div>
    )
}

export default SendMessage
