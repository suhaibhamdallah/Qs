import React from "react";
import {NavLink} from "react-router-dom"
import classes from './NavigationItem.module.css'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";

const style = {
    backgroundColor:"#1FB8EC"
};
const NavigationItem = (props) => (<li>
    <ListItem button key={props.title} style={{padding:"0"}}>
        <NavLink style={{width:"100%",padding:"12px"}} to={props.link}   className={classes.nav_item_mui}>
            <img width="30px" style={{marginRight:"10px"}} src={props.icon} alt=""/>
            <ListItemText primary={props.title}/>
        </NavLink>
    </ListItem>
</li>)

export default NavigationItem;
