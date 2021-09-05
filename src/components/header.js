import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import '../styles/header.css'
import HeaderOptions from './headerOptions'
import menuData from '../constants/headerData';

const Header = ({photo}) => {
    return (
        <div className="header">         
            <div className="header_left">
                <img src="./images/icon.svg" alt=""/>
                <div className="header_search">
                    <SearchIcon/>
                    <input type="text"/>
                </div>

            </div>
            <div className="header_right">
                {
                  menuData.map(menu => (
                    <HeaderOptions Icon={menu.Icon} title={menu.name} avatar={menu.avatar} photo={photo} path={menu.path} classname={menu.className}/>
                  ))  
                }                
            </div>
        </div>
    )
}

export default Header
