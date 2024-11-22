import React from "react";
import Wrap from "../../Wrap/Wrap";
import classes from './SideDrawer.module.css'
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../../Components/logo/Logo";
const SideDrawer =(props)=>(
<div className={classes.s_drawer}>
    <Logo isAuth={true}/>
    <NavigationItems/>
</div>
)

export default SideDrawer;
