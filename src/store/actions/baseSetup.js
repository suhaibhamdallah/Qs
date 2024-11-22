import * as actionTypes from '../actions/actionTypes';
import * as axiosBased from '../../baseAxios'
import * as baseSetupActions from "./baseSetup";



export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    }


}

export const loadingFinish = () => {

    return {
        type: actionTypes.LOADING_FINISH
    }


}

