import React from 'react'
import Header from './header';
import Sidebar from './sidebar';
import Feed from './Feed';
import Login from './Login';
import { useSelector } from 'react-redux';
import Wigets from './Wigets';

const Home = () => {

    const {user} = useSelector(state => state.user);
    console.log("USER = ",user);
    return (
        <div>
             <Header photo={user===undefined || user==="" || !Object.keys(user).length?'./images/avatar.jpg':user.photoURL}/>
                {/* {!Object.keys(user).length ? (<Login/>) : ( */}
                    {user===undefined || user==="" || !Object.keys(user).length? (<Login/>) : (

                <div className="app_body">
                    <Sidebar user={user}/>
                    <Feed user={user}/>
                    <Wigets/>
                </div>
              )}  
        </div>
    )
}

export default Home
