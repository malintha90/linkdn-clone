import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import { db } from '../firebase/firebase';
import firebase from 'firebase';
import { Avatar } from '@material-ui/core';
import ReactPlayer from 'react-player';

import '../styles/popup.css';

const PopupModel = ({user}) => {
   
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssertArea] = useState('');

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setInput("");
      setShareImage("");
      setVideoLink("");
    };

    const sendPost = (e) => {
        e.preventDefault();
        db.collection('posts').add({
            name: 'malintha Kumarage',
            description:"Sample Description",
            message: input,
            postUrl:'',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }
    const handleChange = (e) => {
        const image = e.target.files[0];
         setShareImage(image);
    }

    
    const changeAssertArea = (area) => {      
        setShareImage("");
        setVideoLink("");    
         //setAssertArea(area)  
    }

    return (
        <div>
            <div className="feed_input" onClick={handleOpen}>
                <CreateIcon/>                  
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="model"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={open}>
                <div className="paper">
                    <div className="input_area"> 
                        <Avatar className="popup_avatar" src={user !==undefined ? user.photoURL:"./images/avatar.jpg"}/>                    
                        <textarea type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Share Your Ideas." autoFocus={true}/>                        
                    </div>
                        {assetArea === 'image'? <>
                        <div className="">
                            <input type="file" accept="image/jpeg image/png image/gif" name="image" id="file" className="image_upload" onChange={handleChange}/>
                            
                        </div>
                        <div className="image_preview">
                            {shareImage && <img src={URL.createObjectURL(shareImage)} alt=""/> }
                        </div>
                        </>
                      : assetArea==='media' &&
                      <>
                        <div className="">
                            <input type="text" name="video" id="file" className="image_upload" onChange={(e)=> setVideoLink(e.target.value)}/>
                            
                        </div>
                        <div className="image_preview">
                            {videoLink && <ReactPlayer width={"100%"} url={videoLink}/> }
                        </div>
                       </>
                    }
                    <div className="post_button">                        
                        <button onClick={sendPost} type="submit" disabled={!input?true:false}> Send</button>
                    </div>
                </div>
               
            </Fade>
            </Modal>

            
        </div>
    )
}

export default PopupModel
