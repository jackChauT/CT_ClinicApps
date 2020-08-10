import Constants from "expo-constants";
const { manifest } = Constants;

export const HOST = `http://${manifest.debuggerHost.split(':').shift()}:3344`
export const LOGIN_API = "/user/login"
export const LOGOUT_API = "/user/logout"
export const REGISTER_API = "/user/register"
export const REFRESHTOKEN_API = "/user/refresh-token"
export const CONSULTATION_SIMPLERECORDS_API = "/consultation/simplyRecords"
export const CONSULTATION_DETAIL_API = "/consultation/record"

export const fixTimezoneCalc = 60000 // from https://docs.mongodb.com/v3.2/tutorial/model-time-data/
