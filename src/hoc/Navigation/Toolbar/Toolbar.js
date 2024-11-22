import React from "react";
import Wrap from "../../Wrap/Wrap";
import Logo from "../../../Components/logo/Logo";
import search from "../../../images/search.png";
import notifications from "../../../images/notification.PNG";
import arrowD from "../../../images/chevron-down.png";
import profile from "../../../images/profile.PNG";
import Input from "../../../Components/UI/Input/Input";

import classes from './Toolbar.module.css'
import DropDown from "../../../Components/UI/DropDown/DropDown";
import {useState} from "react";
import Container from '@material-ui/core/Container';
const Toolbar = (props) => {

    const [state,setState]=useState({showDropdownProfile:false,showDropdownNotifications:false})
        const toggleProfileDropdown=()=>{
            const newState={...state};
            newState['showDropdownProfile']=!state.showDropdownProfile;
            setState(newState);
        }
        const toggleNotificationsDropdown=()=>{
            const newState={...state};
            newState['showDropdownNotifications']=!state.showDropdownNotifications;
            setState(newState);
        }
        let _header = null;
    if(props.isAuth){
        _header= <header className={classes.header} style={{width:"100%"}}>
            <Container>
                <div className={props.isAuth?classes.authed:null}>
                    {!props.isAuth?<Logo isAuth={props.isAuth}/>:null}
                    {props.isAuth?<Wrap>
                        {/*<div className={classes.input_wrapper}>*/}
                        {/*    <img src={search} alt=""/>*/}
                        {/*    <input type="text" placeholder="type to search .."/>*/}
                        {/*</div>*/}
                        <div className={classes.auth_p}>
                            <div className={classes.auth_p_s_1}>
                                {/*<i className={classes.p_not}>*/}
                                {/*    <img src={notifications} alt="" onClick={toggleNotificationsDropdown}/>*/}
                                {/*</i>*/}
                                <DropDown header={{title:"Notifications"}} customeStyle={{}} footer={[{title:"See All",link:"/all-notifications"},{title:"See All",link:"/all-notifications"}]} type="notifications"
                                          toggleShow={toggleNotificationsDropdown} show={state.showDropdownNotifications} navs={{title:"Hi Amr",link:"/not-1"}}/>
                            </div>
                            <div className={classes.auth_p_s_2}>
                                <div className={classes.acc_n}>
                                    <div onClick={toggleProfileDropdown}>
                                        <span>{props.userName}</span>
                                        <i ><img width="20" src={arrowD} alt=""/></i>
                                    </div>

                                    <DropDown toggleShow={toggleProfileDropdown} show={state.showDropdownProfile} navs={[{link:"/account-settings",title:"Account Settings"},{link:"/logout",title:"Logout"}]}/>
                                </div>
                                {/*<div>*/}
                                {/*    <img src={profile} alt=""/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </Wrap>:null}
                </div>

            </Container>
        </header>;
    }

    return (
       _header
    )
}



export default Toolbar ;
