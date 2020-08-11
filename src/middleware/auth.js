import { refreshToken } from '../redux/actions/userActions';
import jwtDecode from 'jwt-decode';
import {Alert} from 'react-native';
import { fetchLogout } from '../redux/actions/userActions';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * If less then 1 min
 * @param {*} exp 
 */
function isNeedRefreshToken(exp) {
    return exp - Date.now() / 1000 < 60 // 1 min
}

/**
 * Checking token before fetch api, and auto get token if expired
 * @param {*} param
 */
export function jwt({ dispatch, getState }) {
    return (next) => (action) => {
        return AsyncStorage.getItem('isLogout').then(value => {
            if (typeof action === 'function') {
                let auth = getState().userReducer.auth
                if (typeof value === "undefined" || value == 'true') {
                    return next(action)
                } else if (auth && auth.accessToken) {
                    var tokenExpiration = jwtDecode(auth.accessToken)
                    var isExpired = Date.now() > tokenExpiration.exp * 1000
                    if (isExpired || isNeedRefreshToken(tokenExpiration.exp)) {
                        return refreshToken(dispatch, {refreshToken: auth.refreshToken}).then((d) => {
                          setTimeout(function() {
                            return next(action)
                          }, 500)
                        }).catch(() => {
                            Alert.alert("Auth Failed", "Please Login again",[
                                {text:'YES', onPress: () => {
                                  return next(fetchLogout())
                                }}    
                            ],
                            {cancelable: false})
                        })
                    } else {
                      return next(action)
                    }
                } else {
                  return next(action)
                }
            } else {
              return next(action)
            }
        }).catch(() => {return next(action)})
    }
}