import React from "react";
import classes from './Label.module.css'
const Label = (props)=>{
    const className= props.type==="error"?classes.err:classes.ok;
    const customClass= classes[props.custom_class];


    return(
        <span className={className+" "+customClass}>
        {props.children}
    </span>
        )

}

export default Label;

