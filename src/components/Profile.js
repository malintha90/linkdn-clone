import React, { useState } from 'react'
import Header from './header'
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../actions/userAction';
import '../styles/profile.css';

const Profile = () => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [recentActivities, setRecentActivities] = useState('');
    const [recentArray, setRecentArray] = useState([]);
    const [profileImage, setProfileImage] = useState("");
    const [profileName, setProfileName] = useState("");
    const [profileEmail, setProfileEmail] = useState("");

    const { loading } =useSelector(state => state.loading);

    const addRecentActivities = (e) => {
        e.preventDefault();
        setRecentArray([...recentArray,recentActivities]);
        setRecentActivities('');
    }

    const removeItem = (item) => {   
        const exist = recentArray.map(exist => exist === item);
        if(exist){        
            setRecentArray(recentArray.filter((x) => x !== item))
        }
    }

    const handleChange = (e) => {
        const image = e.target.files[0];
        setProfileImage(image);
    }

    const updateProfile = (e) => {
        e.preventDefault();
        const payload = {
            name: profileName,
            email: profileEmail,
            profileImage: profileImage,
            recentArray:recentArray
        }
       
        dispatch(updateUserProfile(payload));
       
    }

    return (
        <>
        <Header photo={user.photoURL}/>
            <div className="profile">
                <p>{loading && <img src="./images/loading.jpg" alt=""/>}</p>
                <div className="profile_wrapper">
                    <div className="profile_right">
                        <div className="profile_image_div">
                            <input type="file" 
                                accept="image/jpg, image/png, image/gif" 
                                name="image"
                                id="file_button"
                                style={{display:"none"}}                             
                                onChange={handleChange}/>  
                                <label htmlFor="file_button">
                                        <img className="profile_icon" src={profileImage?URL.createObjectURL(profileImage):"./images/uploadPic.png"} alt=""/>   
                                </label >
                                                  
                        </div>                        
                    </div>
                     
                    <div className="profile_left"> 
                        
                        <input placeholder="Full name" type="text" onChange={(e) => setProfileName(e.target.value)} />
                        <input placeholder="Email" type="email" onChange={(e)=>setProfileEmail(e.target.value)} />
                        <div className="recent_div">
                            <input placeholder="Recent" type="text" className="recent_text" value={recentActivities} onChange={(e)=>setRecentActivities(e.target.value)}/> 
                            <button className="add_button" onClick={addRecentActivities}>Add</button>
                            <div className="recent_activity_list">
                                {
                                    recentArray.map(recent => (
                                        <div className="singleItems" >
                                            {recent} <span onClick={() => removeItem(recent)}>X</span>
                                        </div>  
                                    ))
                                }
                            </div>
                        </div>
                        <form>
                            <button type="submit" className="update_profile_button" onClick={(e)=> updateProfile(e)}>Update Profile</button>
                        </form>
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default Profile
