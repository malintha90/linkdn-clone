import React, { useState, useEffect } from 'react'
import Post from './Post';
// import { db } from '../firebase/firebase';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateIcon from '@material-ui/icons/Create';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Avatar } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { postArticleAPI, getPostArticles } from '../actions/postAction';
import '../styles/feed.css';
import { useDispatch, useSelector } from 'react-redux';

const Feed = ({user}) => {

    const dispatch = useDispatch();    
    const { loading } =useSelector(state => state.loading);
    const { articles } = useSelector(state => state.articles);

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssertArea] = useState('');
    const [eventDate, setEventDate] = useState('');

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
          const payload = {
              message: input, 
              media: videoLink, 
              image: shareImage,
              user: user,
              eventDate:eventDate
            }
          dispatch(postArticleAPI(payload));         
          handleClose();
      }

    const handleChange = (e) => {
          const image = e.target.files[0];
           setShareImage(image);
      }
  
      
    const changeAssertArea = (e) => {  
        e.preventDefault();       
        setShareImage("");
        setVideoLink("");    
        setAssertArea('image')  
      }

    useEffect(() => {
        dispatch(getPostArticles())
    },[])

    console.log("Articles = ",articles);
   
    const loadPopUpWithConditions = (assetArea) => {       
        switch(assetArea){
            case 'image':
                return (<>
                    <div className="">
                        <input type="file" accept="image/jpeg image/png image/gif" name="image" id="file" className="image_upload" onChange={handleChange}/>
                        
                    </div>
                    <div className="image_preview">
                        {shareImage && <img src={URL.createObjectURL(shareImage)} alt=""/> }
                    </div>
                </>);
            case 'media':
                return(<>
                    <div className="vedio_updoad_link">
                        <input type="text" name="video" id="file" placeholder="Video URL" className="image_upload" onChange={(e)=> setVideoLink(e.target.value)}/>
                        
                    </div>
                    <div className="vedio_preview">
                        {videoLink && <ReactPlayer  width={"90%"} height={"80%"} url={videoLink}/> }
                    </div>
                </>)
            case 'event':
                    return(<>
                        <div className="vedio_updoad_link">
                            <input type="date" name="video" placeholder="Event Name" className="image_upload" onChange={(e)=> setEventDate(e.target.value)}/>
                            
                        </div>
                        <div className="vedio_preview">
                            {videoLink && <ReactPlayer  width={"90%"} height={"80%"} url={videoLink}/> }
                        </div>
                    </>)
            default:
                return(<></>)
        }
    }

    console.log("AAA = ",articles);

    return (
        <div className="feed">             
            <div className="feed_input_container" onClick={handleOpen}> 
                <div className="feed_input" >
                    <CreateIcon/>                  
                </div>
                <div className="feed_input_options">
                    <div className="input_options" onClick={(e)=> setAssertArea('image')}>
                        <PhotoCameraIcon style={{color:"blue"}}/>
                        <h4>Images</h4>                        
                    </div>
                    <div className="input_options" onClick={(e)=> setAssertArea('media')}>
                        <VideoLibraryIcon style={{color:"gold"}}/>
                        <h4>Video</h4>                        
                    </div>
                    <div className="input_options" onClick={(e)=> setAssertArea('event')}>
                        <EventIcon style={{color:"gray"}}/>
                        <h4>Event</h4>                        
                    </div>
                    <div className="input_options" >
                        <AssignmentIcon style={{color:"green"}} onClick={(e)=> setAssertArea('image')}/>
                        <h4>Article</h4>                        
                    </div>                   
                    
                </div>
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
                        {                        
                            loadPopUpWithConditions(assetArea)
                        }
                    <div className="post_button">                        
                        <button onClick={sendPost} type="submit" disabled={!input?true:false}> Send</button>
                    </div>
                </div>
               
            </Fade>
            </Modal>      
            <div className="loading-img">
                    <p>{loading && <img src="./images/loading.jpg" alt=""/>}</p>
            
            {
                articles.map((post,key) => (
                    
                    <Post 
                        key = {key}
                        name= {post.actor.name}
                        description={post.actor.description}
                        message={post.message}
                        postUrl={post.actor.postUrl}
                        shareImage={post.shareImage}
                        shareMedia={post.shareVedio}
                    />
                ))
            }
            </div>
        </div>
    )
}

export default Feed
