import AppsIcon from '@material-ui/icons/Apps';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';

 const menuData = [
     {
        Icon: HomeIcon,
        name: 'Home',
        path:'/',
        className:'homeIcon'
    },
    {
        Icon: NotificationsIcon,
        name: 'Notification',
        path:'/',
        className:'notificationIcon'
    },
    {
        Icon: PeopleAltIcon,
        name: 'Network',
        path:'/',
        className:'networkIcon'
    },
    {
        Icon: ChatIcon,
        name: 'Chat',
        path:'/chat',
        className:'chaticon'
    },
    {
        avatar: './images/avatar.jpg',
        name:'Me'
    },
];

export default menuData;