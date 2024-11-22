import {AUTH_FAILED, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, SET_REDIRECT_PATH, UPDATE_SUCCESS} from "./actionTypes";

import * as actionTypes from '../actions/actionTypes';
import * as axiosBased from '../../baseAxios'

export const logout = () => {
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


const authStart = () => ({
    type: actionTypes.AUTH_START
})

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS, data: data
    }
}

const setRedirectPath = (path) => ({
    type: actionTypes.SET_REDIRECT_PATH, path: path
})

export const auth = (data) => {
    return (dispatch) => {
        let _url = "/login";
        if (data.signUpMode) {
            _url = "/register";
        }
        axiosBased.authInstance.post(_url, data).then((res) => {
            const expiredTime = new Date(new Date().getTime() + Math.floor(new Date(res.data.expiresAt).getTime()));
            localStorage.setItem('expirationTime', expiredTime);
            localStorage.setItem('access_token', res.data.token);
            // localStorage.setItem('user', JSON.stringify(res.data.user));
            dispatch(authSuccess(res.data));
        }).catch((error) => {
            dispatch(authFailed({error:error.response.data.title,path:"/"}))
        })
    }
}
export const updateAcccount = (token, data) => {
    return (dispatch) => {
        axiosBased.authInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosBased.authInstance.post("/update-account", data).then((res) => {
            if (typeof res !== "undefined") {
                setTimeout(() => {
                    dispatch(updateSuccess(res.data))
                }, 2000)
            }

        }).catch((err) => {
        })
    }
}
const updateSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_SUCCESS, data: data
    }
}

export const authFailed = (data) => {
    return {
        type: actionTypes.AUTH_FAILED,
        data:{path:data.path,error:data.error}
    }

}

const checkAuthTimeout = (expiredTime) => {
    return (dispatch) => {
        return setTimeout(() => dispatch(logout()), expiredTime)
    }
}
export const checkAuthState = () => {
    return (dispatch) => {
        const expiredTime = localStorage.getItem('expirationTime');
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('user');
        if (!token) {
            dispatch(logout());
        } else {
            if (new Date().getTime() < new Date(expiredTime).getTime()) {
                dispatch(authSuccess({auth: {access_token: token}, user: JSON.parse(user)}));
                dispatch(checkAuthTimeout(new Date(expiredTime).getTime() - new Date().getTime()))
            } else {
                dispatch(logout());
            }
        }
    }
}

