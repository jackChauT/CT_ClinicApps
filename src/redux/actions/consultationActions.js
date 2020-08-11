import {CONSULTATION_REQUEST, CONSULTATION_SUCCESS, CONSULTATION_FAILURE, CONSULTATION_DETAIL_SUCCESS, CONSULTATION_DETAIL_EMPTY} from './types';
import {HOST, CONSULTATION_SIMPLERECORDS_API, CONSULTATION_DETAIL_API} from '../../config/config';
import queryString from 'query-string'
export const fetchingConsultationRequest = () => ({
    type: CONSULTATION_REQUEST
})

export const fetchingConsultationSimpleRecordsSuccess = (json) => ({
    type: CONSULTATION_SUCCESS,
    payload: json
})

export const fetchingConsultationFailure = (error) => ({
    type: CONSULTATION_FAILURE,
    payload: error
})

export const fetchingConsultationDetailSuccess = (json) => ({
    type: CONSULTATION_DETAIL_SUCCESS,
    payload: json
})

export const emptyConsultationDetailRequest = () => ({
    type: CONSULTATION_DETAIL_EMPTY,
})

export const fetchConsultationSimpleRecords = (data) => {
    return async (dispatch, getState) => {
        dispatch(fetchingConsultationRequest());
        try {
            let response = await fetch(
                `${HOST + CONSULTATION_SIMPLERECORDS_API}?${queryString.stringify(data)}`
                ,{ 
                    method: 'GET',
                    headers:{
                        Authorization: `Bearer ${getState().userReducer.auth.accessToken}`
                    }
                })
            let json = await response.json()
            if (json.error) {
                dispatch(fetchingConsultationFailure(json.error.message));
            } else {
                dispatch(fetchingConsultationSimpleRecordsSuccess(json));
            }
        } catch (err) {
            dispatch(fetchingConsultationFailure(err));
        }
    }
}

export const fetchConsultationDetail = (data) => {
    return async (dispatch, getState) => {
        dispatch(fetchingConsultationRequest());
        try {

            let response = await fetch(
                `${HOST + CONSULTATION_DETAIL_API}/${data.id}`
                ,{ 
                    method: 'GET', 
                    headers:{
                        Authorization: `Bearer ${getState().userReducer.auth.accessToken}`
                    }
                })
            let json = await response.json()
            if (json.error) {
                dispatch(fetchingConsultationFailure(json.error.message));
            } else {
                dispatch(fetchingConsultationDetailSuccess(json));
            }
        } catch (err) {
            dispatch(fetchingConsultationFailure(err));
        }
    }
}

export const emptyConsultationDetail = () => (dispatch) => dispatch(emptyConsultationDetailRequest())
