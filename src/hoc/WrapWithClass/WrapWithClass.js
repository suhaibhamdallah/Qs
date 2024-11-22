import React from "react";
import classes from './WrapWithClass.module.css'

const WrapWithClass = (props) => (
    <div className={classes[props.class_name]}>
        {props.children}
    </div>

);

export default WrapWithClass;
