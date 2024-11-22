import React from "react";
import classes from './Switch.module.css'

const Switch =(props)=>(
	<span className={[props.status?classes.green:classes.red,classes.item_status,props.large?classes.large:""].join(" ")}>
			{props.status?"ON":"OFF"}
		</span>
)

export default Switch;
