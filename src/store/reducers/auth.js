import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";
import {AUTH_START, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token: null,
    user: {},
    loading: false,
    error: null,
    redirect_path: '/',
    current_page_title:"",
    update_data:"",

}

const reducer = ( state = initialState,action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START):
          return  updateObject(state, {loading: true, error: null})
        case (actionTypes.AUTH_SUCCESS):
            return   updateObject(state, {loading: false, error: null,user:{},token:action.data.token})
        case (actionTypes.AUTH_FAILED):
            return   updateObject(state, {loading: false, error: action.data.error,user:null,token:null,redirect_path: action.data.path})
        case(actionTypes.AUTH_LOGOUT):
            return  updateObject(state, {loading: false, error: null,user:{},token:null,redirect_path:"/"})
        case(actionTypes.SET_PAGE_TITLE):
            return  updateObject(state, {current_page_title:action.page_title})
        case(actionTypes.UPDATE_SUCCESS):
            return  updateObject(state, {update_data:action.data.message})
        default:
            return state
    }
}
export default reducer;
