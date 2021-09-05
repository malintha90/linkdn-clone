import React, { useState, useEffect } from 'react'
import '../styles/headerOptions.css'
import { Avatar } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../actions/userAction';
import { getEvants } from '../actions/eventAction';


const HeaderOptions = ({avatar, Icon, title,photo, path}) => {
    photo = photo ? photo:avatar;

    const [anchorEl, setAnchorEl] = useState(null);
    const [popupNotification, setpopupNotification] = useState(null);
    const {events} = useSelector(state => state.events);
    const {user} = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setpopupNotification(null);
    };

    const signOut = () => {       
        dispatch(signOutUser());
    }

    const handleClickNotification = (event) => {
        setpopupNotification(event.currentTarget);
    };

    useEffect(() => {
        dispatch(getEvants())
    },[])

    const open = Boolean(popupNotification);
    const id = open ? 'simple-popover' : undefined;
  
    return (
        <>
        <Link to={path} className="headerLink">
        <div className="headerOptions">
            {title == 'Notification' ? <Badge onClick={handleClickNotification} badgeContent={events.length !=0 && user !==""? <span className="count">{events.length}</span>:<span></span>} className="hederOPtion_icon_count"><Icon/></Badge>:Icon && <Icon className="hederOPtion_icon"/>}
            {avatar && photo && <Avatar className="hederOPtion_icon" src={ photo ? photo:avatar} onClick={handleClick}/>}
            <h3 className="headerOption_title">{title}</h3>
        </div>
        <>
     
        </>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <Link to="/profile" className="rediretLink"><MenuItem>Change Profile</MenuItem></Link>           
            <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
        </Link>

        <Popover
            id={id}
            open={open}
            anchorEl={popupNotification}
            className='popUp'
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
            >
            <div className="notificationPopUp">
                {
                    events && events.map(event => (
                        <p>{`${event.message} - ${event.eventDate}`}</p>
                    ))
                }
            </div>
        </Popover>
        </>
    )
}

export default HeaderOptions
