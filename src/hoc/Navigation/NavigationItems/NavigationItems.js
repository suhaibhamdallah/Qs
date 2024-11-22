import React, {Component} from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css'
import homeIcon from '../../../images/home.PNG'
import extIcon from '../../../images/phone.png'
import PhoneIcon from '../../../images/menu-ext.svg';
import SettingsVoiceIcon from '../../../images/menu-cdrs.svg';
import usersIcon from '../../../images/cog.png';
import PeopleIcon from '../../../images/menu-groups.svg';
import groupsIcon from '../../../images/users.png';
import SettingsIcon from '../../../images/users-settings.svg';
// import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import {useSelector} from "react-redux";
import DashboardIcon from '../../../images/menu-dashboard.svg';
import AssessmentIcon from '../../../images/menu-reports.svg';
let _itemsArr = [{title: 'Dashboard', link: '/',icon:DashboardIcon}, {title: 'Questions', link: '/questions'}, {title: 'Schools', link: '/schools'}]


const NavigationItems = (props) => {
    const baseSetup = useSelector((state) => state);

   if(baseSetup.auth.user.role===3){

       _itemsArr = [{title: 'Extensions Management ', link: '/extensions-management',icon:PhoneIcon}]
   }
   if(baseSetup.auth.user.role===2 ||baseSetup.auth.user.role===4){
       _itemsArr = [{title: 'System CDRs', link: '/system-cdrs',icon:SettingsVoiceIcon}]
   }
    const navItems = _itemsArr.map((nav => (<NavigationItem title={nav.title} icon={nav.icon} link={nav.link}/>)));

    return (<ul className={classes.nav_items}>
            {navItems}
        </ul>)
}


export default NavigationItems;
