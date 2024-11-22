import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";


const initialState = {
    dids: [], roles: [], error: null, loading: false, totalCdrs: 0, totalExtensions: 0, totalDids: 0, primaryDid: ""

}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PBX_LOADING_START:
            return updateObject(state, {loading: true});
        case actionTypes.PBX_LOADING_FINISH:
            return updateObject(state, {loading: false});

    }


    return state;

}

export default reducer;