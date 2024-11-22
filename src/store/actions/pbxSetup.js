import * as actionTypes from '../actions/actionTypes';
import * as axiosBased from '../../baseAxios'
import * as pbxSetupActions from "./pbxSetup";
import {statistics} from "../../baseAxios";
import {
    GET_PRIMARY_DID_FAILED, GET_PRIMARY_DID_SUCCESS, GET_TOTAL_CDRS, GET_TOTAL_DIDS, GET_TOTAL_EXTENSIONS
} from "../actions/actionTypes";



export const pbxLoadingStart = () => {
    return {
        type: actionTypes.PBX_LOADING_START
    }


}

export const pbxLoadingFinish = () => {

    return {
        type: actionTypes.PBX_LOADING_FINISH
    }


}

