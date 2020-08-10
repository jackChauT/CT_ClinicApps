import {LOGOUT_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    REFRESHTOKEN_REQUEST, REFRESHTOKEN_SUCCESS, REFRESHTOKEN_FAILURE} from '../actions/types';

const initialState = {
    isFetching: true,
    errMessage: '',
    user: {},
    auth: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return {...state, user: {}, auth: {}, errMessage: {}}
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {...state, isFetching: true}
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {...state, isFetching: false, errMessage: action.payload}
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {...state, isFetching: false, user: {
                id: action.payload.id,
                clinic: action.payload.clinic,
                email: action.payload.email,
                phone: action.payload.phone,
                address: action.payload.phone,
                offset: action.payload.offset,
            },
            auth: {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }}        
        case REFRESHTOKEN_REQUEST:
            return {...state, isFetching: true}
        case REFRESHTOKEN_FAILURE:
            return {...state, isFetching: false, errMessage: action.payload}
        case REFRESHTOKEN_SUCCESS:
            return {...state, isFetching: false, auth: {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }}
        default:
            return state;
    }
}

export default userReducer;