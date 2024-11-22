import React from "react";
import classes from './Logo.module.css';
import LogoImg from '../../images/platel-logo.png'
import LogoImgAuth from '../../images/platel-logo.png'
import {NavLink} from "react-router-dom";

const Logo = (props) => {
    const classesArr= [classes.logo,props.isAuth ? classes.auth : ""];
    return <NavLink to="/" className={classesArr.join(" ")}>
        <img src={props.isAuth ? LogoImgAuth : LogoImg} alt=""/>
    </NavLink>
}


export default Logo;