import React from "react";
import {useSelector} from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressLinear = (props) => {
    const pbxSetup = useSelector((state) => state);
    return pbxSetup.setupPbx.loading ? <LinearProgress/> : null
}

export default ProgressLinear;