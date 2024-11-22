import React from "react";
import {useSelector} from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressLinear = (props) => {
    const baseSetup = useSelector((state) => state);
    return baseSetup.baseSetup.loading ? <LinearProgress/> : null
}

export default ProgressLinear;