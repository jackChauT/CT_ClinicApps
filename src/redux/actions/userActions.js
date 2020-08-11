import {LOGOUT_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    REFRESHTOKEN_REQUEST, REFRESHTOKEN_SUCCESS, REFRESHTOKEN_FAILURE} from './types';
import {HOST, LOGIN_API, REGISTER_API, REFRESHTOKEN_API, LOGOUT_API} from '../../config/config';

export const fetchingLogoutRequest = () => ({
    type: LOGOUT_REQUEST,
})

export const fetchingLoginRequest = () => ({
    type: LOGIN_REQUEST,
})

export const fetchingLoginSuccess = (json) => ({
    type: LOGIN_SUCCESS,
    payload: json
})

export const fetchingLoginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
})

export const fetchingRegisterRequest = () => ({
    type: REGISTER_REQUEST
})

export const fetchingRegisterSuccess = (json) => ({
    type: REGISTER_SUCCESS,
    payload: json
})

export const fetchingRegisterFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
})

export const fetchingRefreshTokenRequest = () => ({
    type: REFRESHTOKEN_REQUEST
})

export const fetchingRefreshTokenSuccess = (json) => ({
    type: REFRESHTOKEN_SUCCESS,
    payload: json
})

export const fetchingRefreshTokenFailure = (error) => ({
    type: REFRESHTOKEN_FAILURE,
    payload: error
})

export const fetchLogout = (data) => {

    return dispatch => {
        dispatch(fetchingLogoutRequest())
        return fetch(
            HOST + LOGOUT_API,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(() => {
                return Promise.resolve()
            }).catch(err => {
                return Promise.reject(err);
            })
    }
}

export const fetchLogin = (data) => {
    return dispatch => {
        dispatch(fetchingLoginRequest());
        return fetch(
            HOST + LOGIN_API,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                return response.json()
            })
            .then(json => {
                if (json.error) {
                    dispatch(fetchingLoginFailure(json.error.message));
                    return Promise.reject(json.error.message);
                }
                dispatch(fetchingLoginSuccess(json));
                return Promise.resolve(json)
            })
            .catch(err => {
                dispatch(fetchingLoginFailure(err));
                return Promise.reject(err);
            })
    }
}


export const fetchRegister = (data) => {
  return dispatch => {
      dispatch(fetchingRegisterRequest());
      return fetch(
          HOST + REGISTER_API,{
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(response => {
              return response.json()
          })
          .then(json => {
              if (json.error) {
                  dispatch(fetchingRegisterFailure(json.error.message));
                  return Promise.reject(json.error.message);
              }
              dispatch(fetchingRegisterSuccess(json));
              return Promise.resolve(json)
          })
          .catch(err => {
              dispatch(fetchingRegisterFailure(err));
              return Promise.reject(err);
          })
  }
}

// export const fetchRegister = (data) => {
//     return async dispatch => {
//         dispatch(fetchingRegisterRequest());
//         try {
//             let response = await fetch(
//                 HOST + REGISTER_API,{
//                     method: 'POST',
//                     headers: {
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(data)
//                 })
//             let json = await response.json()
//             if (json.error) {
//                 dispatch(fetchingRegisterFailure(json.error.message));
//                 return false
//             } else {
//                 dispatch(fetchingRegisterSuccess(json));
//                 return true
//             }
//         } catch (err) {
//             dispatch(fetchingRegisterFailure(err));
//             return err
//         }
//     }
// }

export function refreshToken(dispatch, data) {
    return fetch(
        HOST + REFRESHTOKEN_API,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
          }).then(function(json) {
            if (json.error) {
                return Promise.reject({
                    message: 'could not refresh token'
                });
            } else {
                dispatch(fetchingRefreshTokenSuccess(json));
                return Promise.resolve(json.accessToken)
            }
        })
        .catch(err => {
            dispatch(fetchingRefreshTokenFailure(err));
            return Promise.reject(err);
        });
}