import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classes from './DropDown.module.css'
import NotificationsIcon from "../../../Icons/icons/icon-notifications.svg"

export default function SimpleMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navs = Object.keys(props.navs).map((_el) => (
        <MenuItem>
            <NavLink onClick={handleClose} to={props.navs[_el].link}>{props.navs[_el].title}</NavLink>
        </MenuItem>
    ));
    return (
        <div style={{marginLeft:"auto"}}>
            <div className={classes.m_l_wrapper}>
                <img src={NotificationsIcon}/>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ExpandMoreIcon style={{color:"#fff"}}/>
                </Button>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {navs}
            </Menu>
        </div>
    );
}
