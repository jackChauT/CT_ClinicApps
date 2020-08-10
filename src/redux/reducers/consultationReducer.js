import {CONSULTATION_REQUEST, CONSULTATION_SUCCESS, CONSULTATION_FAILURE,
    CONSULTATION_DETAIL_SUCCESS, CONSULTATION_DETAIL_EMPTY} from '../actions/types';

const initialState = {
    isFetching: true,
    errMessage: '',
    records: {},
    detail: {}
}

const consultationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSULTATION_REQUEST:
            return {...state, isFetching: true}
        case CONSULTATION_FAILURE:
            return {...state, isFetching: false, errMessage: action.payload}
        case CONSULTATION_SUCCESS:
            return {...state, isFetching: false, records: action.payload}
        case CONSULTATION_DETAIL_SUCCESS:
            return {...state, isFetching: false, detail: action.payload}
        case CONSULTATION_DETAIL_EMPTY:
            return {...state, isFetching: true, detail: {}}
        default:
            return state;
    }
}

export default consultationReducer;