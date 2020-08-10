import { refreshToken } from '../redux/actions/userActions';
import jwtDecode from 'jwt-decode';
import {Alert} from 'react-native';
import { fetchLogout } from '../redux/actions/userActions';
import AsyncStorage from '@react-native-community/async-storage';

function skipLoginAndRegister(type) {
    if (typeof type != "undefined") {
        return (type.toUpperCase().includes('LOGOUT') || type.toUpperCase().includes('LOGIN') || type.toUpperCase().includes('REGISTER'))
    }
    return false
}

/**
 * If less then 1 min
 * @param {*} exp 
 */
function isNeedRefreshToken(exp) {
    return exp - Date.now() / 1000 < 60 // 1 min
}

/**
 * Checking token before fetch api, and auto get token if expired
 * @param {*} param0 
 */
export function jwt({ dispatch, getState }) {
    console.log("jwt jwt jwt jwt jwt jwt jwt jwt")
    console.log(JSON.stringify(dispatch))
    console.log(getState())

    return (next) => (action) => {
        return AsyncStorage.getItem('isLogout').then(value => {
            console.log(`isLogout: ${value}`)
            if (typeof action === 'function') {
                let auth = getState().userReducer.auth
                if (typeof value === "undefined" || value == 'true') {
                    next(action)
                } else if (auth && auth.accessToken) {
                    console.log(`access auth`)
                    var tokenExpiration = jwtDecode(auth.accessToken)
                    var isExpired = Date.now() > tokenExpiration.exp * 1000
                    if (isExpired || isNeedRefreshToken(tokenExpiration.exp)) {
                        return refreshToken(dispatch, {refreshToken: auth.refreshToken}).then(r => {
                            next(action)
                        }).catch(err => {
                            Alert.alert("Auth Failed", "Please Login again",[
                                {text:'YES', onPress: () => {
                                    next(fetchLogout())
                                }}    
                            ],
                            {cancelable: false})
                        })
                    } else {
                        next(action)
                    }
                } else {
                    next(action)
                }
            } else {
                next(action)
            }
        }).catch(err => next(action))
    }

    // return (next) => (action) => {
    //     // console.log(action)
    //     // console.log(typeof action)
    //     // console.log(JSON.stringify(action))
        
    //     // if (typeof action === 'function') {
    //     //     let auth = getState().userReducer.auth
    //     //     console.log("auth")
    //     //     console.log(auth)
    //     //     // let user = getState().userReducer.user
    //     //     if (auth && auth.accessToken) {
    //     //         var tokenExpiration = jwtDecode(auth.accessToken)
    //     //         console.log("tokenExpiration")
    //     //         console.log(typeof action)
    //     //         console.log(action)
    //     //         var isExpired = Date.now() > tokenExpiration.exp * 1000
    //     //         if (isExpired || isNeedRefreshToken(tokenExpiration.exp)) {
    //     //             console.log("Refresh Token")
    //     //             return refreshToken(dispatch, {refreshToken: auth.refreshToken})
    //     //                 .then(d => {
    //     //                     console.log("Here")
    //     //                     console.log(d)
    //     //                     next(action)
    //     //                 })
    //     //                 .catch(err => {
    //     //                     console.log(action.type)
    //     //                     Alert.alert("Auth Failed", "Please Login again",[
    //     //                         {text:'YES', onPress: () => {
    //     //                             next(fetchLogout())
    //     //                         }}    
    //     //                     ],
    //     //                     {cancelable: false})
    //     //                     console.log("Error with Refresh token")
    //     //                 });
    //     //         }
    //     //     }
    //     // }
    //     return next(action);
}